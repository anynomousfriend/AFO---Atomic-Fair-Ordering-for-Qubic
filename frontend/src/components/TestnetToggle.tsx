import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import type { TestnetStatus } from '../types/index.js';

interface Props {
  useReal: boolean;
  status: TestnetStatus;
  onToggle: (useReal: boolean) => void;
}

const TestnetToggle: React.FC<Props> = ({ useReal, status }) => {
  const statusIcon = status === 'connected' ? '●' : status === 'checking' ? '◐' : '●';
  const statusColor = status === 'connected' ? 'green' : status === 'checking' ? 'yellow' : 'red';
  
  const testnetLabel = useReal ? 'Real Testnet' : 'Mock Testnet';
  const testnetColor = useReal ? 'red' : 'green';
  
  return (
    <Box flexDirection="column" borderStyle="single" borderColor="magenta" paddingX={2} paddingY={1}>
      <Box>
        <Text>{chalk.magenta('Testnet: ')} </Text>
        <Text>{chalk[testnetColor](testnetLabel)} </Text>
        <Text>{chalk[statusColor](statusIcon)} </Text>
        <Text>{chalk.gray(status.toUpperCase())}</Text>
      </Box>
      <Text>{chalk.gray('Press [?] for help')}</Text>
    </Box>
  );
};

export default TestnetToggle;
