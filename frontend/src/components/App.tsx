import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import Header from './Header.js';
import TestnetToggle from './TestnetToggle.js';
import EpochControl from './EpochControl.js';
import IntentsList from './IntentsList.js';
import AttackDemo from './AttackDemo.js';
import Footer from './Footer.js';
import type { Intent, Screen, EpochPhase, TestnetStatus } from '../types/index.js';
import { mockTestnet } from '../services/mockTestnet.js';

const App: React.FC = () => {
  const [intents, setIntents] = useState<Intent[]>([]);
  const [epochId, setEpochId] = useState(1);
  const [epochPhase, setEpochPhase] = useState<EpochPhase>('open');
  const [epochProgress, setEpochProgress] = useState(0);
  const [useRealTestnet] = useState(false);
  const [testnetStatus, setTestnetStatus] = useState<TestnetStatus>('checking');
  const [activeScreen, setActiveScreen] = useState<Screen>('main');
  const [selectedIntentIdx, setSelectedIntentIdx] = useState(0);

  // Check testnet on mount
  useEffect(() => {
    checkTestnet();
  }, []);

  const checkTestnet = async () => {
    setTestnetStatus('checking');
    try {
      await mockTestnet.checkConnection();
      setTestnetStatus('connected');
    } catch {
      setTestnetStatus('failed');
    }
  };

  const submitIntent = (amount: number, token: string, isAttacker: boolean = false) => {
    const userId = isAttacker 
      ? 'ATTACKER' 
      : `user-${Math.floor(Math.random() * 10000).toString(16).padStart(4, '0')}`;
    
    const hash = mockTestnet.generateCommitHash(
      `${userId}:${amount}:${token}`,
      Math.random().toString()
    );

    const intent: Intent = {
      id: `intent-${Date.now()}-${Math.random()}`,
      user: userId,
      amount,
      token,
      status: 'pending',
      timestamp: Date.now(),
      hash,
    };
    
    setIntents([...intents, intent]);
  };

  const closeEpoch = () => {
    if (epochPhase !== 'open' || intents.length === 0) return;

    // Sort intents deterministically (timestamp, then hash)
    const sorted = [...intents].sort((a, b) => {
      if (a.timestamp !== b.timestamp) return a.timestamp - b.timestamp;
      return (a.hash || '').localeCompare(b.hash || '');
    });

    const locked = sorted.map((intent, idx) => ({
      ...intent,
      status: 'locked' as const,
      order: idx + 1,
    }));

    setIntents(locked);
    setEpochPhase('locked');
    setEpochProgress(50);
  };

  const executeEpoch = () => {
    if (epochPhase !== 'locked') return;

    const executed = intents.map(intent => ({
      ...intent,
      status: 'executed' as const,
    }));
    
    setIntents(executed);
    setEpochPhase('executed');
    setEpochProgress(100);
  };

  const resetEpoch = () => {
    setIntents([]);
    setEpochId(epochId + 1);
    setEpochPhase('open');
    setEpochProgress(0);
    setSelectedIntentIdx(0);
  };

  const addRandomIntent = () => {
    if (epochPhase !== 'open') return;
    
    const tokens = ['TokenA', 'TokenB'];
    const amounts = [100, 500, 1000, 2000, 5000];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    
    submitIntent(amount, token, false);
  };

  const addAttackerIntent = () => {
    if (epochPhase !== 'open') return;
    submitIntent(10000, 'TokenA', true);
  };

  // Keyboard input handler
  useInput((input, key) => {
    // Global keys
    if (input === 'q') {
      process.exit(0);
    }
    
    if (input === '?') {
      setActiveScreen(activeScreen === 'help' ? 'main' : 'help');
      return;
    }
    
    // Navigation
    if (input === '1') setActiveScreen('main');
    if (input === '2') setActiveScreen('intents');
    if (input === '3') setActiveScreen('attack');
    
    // Actions
    if (input === 'c' || input === 'C') {
      closeEpoch();
    }
    if (input === 'e' || input === 'E') {
      executeEpoch();
    }
    if (input === 'r' || input === 'R') {
      resetEpoch();
    }
    if (input === 'a' || input === 'A') {
      addRandomIntent();
    }
    if (input === 'x' || input === 'X') {
      addAttackerIntent();
    }
    
    // Arrow keys for list navigation
    if (key.downArrow && selectedIntentIdx < intents.length - 1) {
      setSelectedIntentIdx(selectedIntentIdx + 1);
    }
    if (key.upArrow && selectedIntentIdx > 0) {
      setSelectedIntentIdx(selectedIntentIdx - 1);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Header />
      
      {activeScreen === 'main' && (
        <Box flexDirection="column">
          <TestnetToggle 
            useReal={useRealTestnet}
            status={testnetStatus}
            onToggle={() => {}}
          />
          
          <Box marginTop={1}>
            <EpochControl
              epochId={epochId}
              phase={epochPhase}
              progress={epochProgress}
              intentsCount={intents.length}
              onClose={closeEpoch}
              onExecute={executeEpoch}
              onReset={resetEpoch}
              onSubmitIntent={submitIntent}
            />
          </Box>

          <Box marginTop={1} flexDirection="column" borderStyle="single" borderColor="yellow" paddingX={2} paddingY={1}>
            <Text>{chalk.yellow.bold('Quick Actions:')}</Text>
            <Text>{chalk.green('[A]')} Add Random User Intent</Text>
            <Text>{chalk.red('[X]')} Add Attacker Intent (sandwich attempt)</Text>
          </Box>
        </Box>
      )}

      {activeScreen === 'intents' && (
        <IntentsList 
          intents={intents}
          selectedIdx={selectedIntentIdx}
        />
      )}

      {activeScreen === 'attack' && (
        <AttackDemo
          epochId={epochId}
          intents={intents}
        />
      )}

      {activeScreen === 'help' && (
        <Box flexDirection="column" borderStyle="single" borderColor="cyan" paddingX={2} paddingY={1} marginTop={1}>
          <Text>{chalk.cyan.bold('=== Keyboard Shortcuts ===')}</Text>
          <Box marginTop={1} flexDirection="column">
            <Text>{chalk.yellow('Global:')}</Text>
            <Text>  q              Quit application</Text>
            <Text>  ?              Toggle this help screen</Text>
            <Text>  1              Main screen</Text>
            <Text>  2              View intents list</Text>
            <Text>  3              Attack simulation</Text>
            
            <Text marginTop={1}>{chalk.yellow('Actions:')}</Text>
            <Text>  a              Add random user intent</Text>
            <Text>  x              Add attacker intent (sandwich)</Text>
            <Text>  c              Close epoch (lock order) when open</Text>
            <Text>  e              Execute batch when locked</Text>
            <Text>  r              Reset epoch</Text>
            
            <Text marginTop={1}>{chalk.yellow('Navigation:')}</Text>
            <Text>  ↑/↓            Navigate intents list</Text>
          </Box>
        </Box>
      )}

      <Footer activeScreen={activeScreen} />
    </Box>
  );
};

export default App;
