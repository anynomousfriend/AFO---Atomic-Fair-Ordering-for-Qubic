// Theme and color utilities for AFO TUI

export const COLORS = {
  // Primary palette (pastel + contrast)
  primary: '#9D84E8',       // Soft purple
  secondary: '#6BCF7F',     // Soft green
  accent: '#FF9B85',        // Soft coral
  background: '#1E1E1E',    // Dark charcoal (terminal background)
  text: '#E8E8E8',          // Light gray (high contrast text)
  textMuted: '#A0A0A0',     // Medium gray
  
  // Status colors (semantic + beautiful)
  pending: '#FFD580',       // Soft yellow
  locked: '#FF9B85',        // Soft coral (locked/immutable)
  executed: '#6BCF7F',      // Soft green (success)
  failed: '#FF7B7B',        // Soft red (error)
  attacker: '#FF5555',      // Bright red (malicious)
  
  // Borders & dividers
  border: '#404040',        // Subtle dark gray
  highlight: '#6BCF7F',     // Green highlight
};

export const formatValue = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
  return value.toString();
};

export const formatHash = (hash: string): string => {
  return hash.slice(0, 8);
};

export const generateProgressBar = (progress: number, width: number = 20): string => {
  const filled = Math.floor((progress / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
};
