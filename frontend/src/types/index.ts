// Type definitions for AFO TUI

export interface Intent {
  id: string;
  user: string;
  amount: number;
  token: string;
  status: 'pending' | 'locked' | 'executed' | 'failed';
  timestamp: number;
  order?: number;
  hash?: string;
}

export type EpochPhase = 'open' | 'locked' | 'executed';

export type Screen = 'main' | 'intents' | 'attack' | 'help';

export type TestnetStatus = 'checking' | 'connected' | 'failed';

export interface EpochState {
  id: number;
  phase: EpochPhase;
  progress: number;
  intentsCount: number;
}
