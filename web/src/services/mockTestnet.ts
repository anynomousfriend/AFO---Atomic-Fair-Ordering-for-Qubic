// Mock testnet service for AFO demo
import { Intent, EpochStatus } from '../types';

class MockTestnetService {
  private tick: number = 1000;
  private epochStatus: EpochStatus = 'OPEN';
  private intents: Intent[] = [];
  private currentEpoch: number = 1;
  private intentCounter: number = 0;

  // Generate a random user address
  private generateUser(): string {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  }

  // Simple hash function (DJB2)
  private hashString(str: string): string {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return (hash >>> 0).toString(16).padStart(16, '0');
  }

  // Submit a regular user intent
  submitIntent(): void {
    if (this.epochStatus !== 'OPEN') return;

    const amountIn = Math.floor(Math.random() * 100) + 10; // 10-110
    const nonce = Math.random().toString(36).substring(2);
    const swapDetails = `${amountIn}:ETH:USDC:${nonce}`;
    
    const intent: Intent = {
      id: `intent_${++this.intentCounter}`,
      user: this.generateUser(),
      amountIn,
      tokenIn: 'ETH',
      status: 'PENDING',
      timestamp: this.tick++,
      commitHash: this.hashString(swapDetails),
      isAttacker: false,
    };

    this.intents.push(intent);
  }

  // Submit an attacker intent
  submitAttackerIntent(): void {
    if (this.epochStatus !== 'OPEN') return;

    const amountIn = Math.floor(Math.random() * 500) + 200; // 200-700 (larger)
    const nonce = Math.random().toString(36).substring(2);
    const swapDetails = `${amountIn}:ETH:USDC:${nonce}`;
    
    const intent: Intent = {
      id: `attacker_${++this.intentCounter}`,
      user: this.generateUser(),
      amountIn,
      tokenIn: 'ETH',
      status: 'PENDING',
      timestamp: this.tick++,
      commitHash: this.hashString(swapDetails),
      isAttacker: true,
    };

    this.intents.push(intent);
  }

  // Close epoch and lock ordering
  closeEpoch(): void {
    if (this.epochStatus !== 'OPEN') return;

    this.epochStatus = 'CLOSED';
    
    // Sort intents deterministically by timestamp, then by hash
    this.intents.sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      return a.commitHash.localeCompare(b.commitHash);
    });

    // Assign order numbers and lock status
    this.intents.forEach((intent, index) => {
      intent.order = index + 1;
      intent.status = 'LOCKED';
    });
  }

  // Execute all intents in locked order
  executeBatch(): void {
    if (this.epochStatus !== 'CLOSED') return;

    this.epochStatus = 'EXECUTING';

    // Mark all intents as executed
    this.intents.forEach(intent => {
      intent.status = 'EXECUTED';
    });

    // In a real implementation, this would process swaps through the AMM
  }

  // Reset for new epoch
  resetEpoch(): void {
    this.intents = [];
    this.epochStatus = 'OPEN';
    this.currentEpoch++;
    this.intentCounter = 0;
    this.tick = 1000;
  }

  // Getters
  getEpochStatus(): EpochStatus {
    return this.epochStatus;
  }

  getIntents(): Intent[] {
    return [...this.intents];
  }

  getCurrentEpoch(): number {
    return this.currentEpoch;
  }

  getCurrentTick(): number {
    return this.tick;
  }
}

export const mockTestnet = new MockTestnetService();
