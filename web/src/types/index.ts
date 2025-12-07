// Type definitions for AFO Web App

export interface Intent {
  id: string;
  user: string;
  amountIn: number;
  tokenIn: string;
  status: 'PENDING' | 'LOCKED' | 'EXECUTED';
  timestamp: number;
  order?: number;
  commitHash: string;
  isAttacker?: boolean;
}

export type EpochStatus = 'OPEN' | 'CLOSED' | 'EXECUTING';

export interface EpochState {
  id: number;
  status: EpochStatus;
  intentsCount: number;
}
