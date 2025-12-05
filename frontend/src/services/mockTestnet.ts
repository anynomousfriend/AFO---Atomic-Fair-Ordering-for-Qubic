// Mock testnet service for AFO demo

export class MockTestnetService {
  private tick: number = 0;
  
  async checkConnection(): Promise<boolean> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
  
  getCurrentTick(): number {
    return this.tick;
  }
  
  incrementTick(): number {
    return ++this.tick;
  }
  
  async submitIntent(user: string, amount: number, token: string): Promise<string> {
    // Simulate intent submission
    const hash = Math.random().toString(16).slice(2, 18);
    return hash;
  }
  
  generateCommitHash(plaintext: string, nonce: string): string {
    // Simple deterministic hash for demo
    let hash = 5381;
    const data = plaintext + nonce;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) + hash) ^ data.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
  }
}

export const mockTestnet = new MockTestnetService();
