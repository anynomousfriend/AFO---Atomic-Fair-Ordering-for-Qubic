import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';

const Header: React.FC = () => {
  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" paddingX={2} paddingY={1} marginBottom={1}>
      <Text>
        {chalk.cyan.bold('╔═══════════════════════════════════════════════════════════╗')}{'\n'}
        {chalk.cyan.bold('║           AFO - Atomic Fair Ordering Demo                ║')}{'\n'}
        {chalk.cyan.bold('║     Qubic Tick-Based Finality for MEV-Fair DeFi          ║')}{'\n'}
        {chalk.cyan.bold('╚═══════════════════════════════════════════════════════════╝')}
      </Text>
    </Box>
  );
};

export default Header;
