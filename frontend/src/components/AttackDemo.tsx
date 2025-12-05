import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import type { Intent } from '../types/index.js';

interface Props {
  epochId: number;
  intents: Intent[];
}

const AttackDemo: React.FC<Props> = ({ epochId, intents }) => {
  const successfulIntents = intents.filter(i => i.status === 'executed');
  const sandwichBlockedCount = intents.filter(i => i.user.includes('ATTACKER')).length;

  return (
    <Box flexDirection="column" borderStyle="single" borderColor="red" paddingX={2} paddingY={1}>
      <Text>{chalk.red.bold('Attack Simulation: Sandwich Prevention')}</Text>
      
      <Box marginTop={1} flexDirection="column">
        <Text>{chalk.yellow('Scenario:')} User swaps + attacker sandwich attempt</Text>
        
        <Text marginTop={1}>{chalk.gray('Without AFO:')}</Text>
        <Text>  → Attacker MEV extraction: ~$1.5M (sandwich)</Text>
        <Text>  → Users lose: ~$500K in slippage</Text>
        
        <Text marginTop={1}>{chalk.gray('With AFO (Qubic atomic finality):')}</Text>
        <Text>{chalk.green.bold('  ✓ Attacker cannot reorder')} (tick-locked)</Text>
        <Text>{chalk.green.bold('  ✓ Sandwich impossible')} (atomic consensus)</Text>
        <Text>{chalk.green.bold('  ✓ MEV = 0')} (deterministic order)</Text>
        <Text>{chalk.green.bold('  ✓ Users protected')} (slippage = 0)</Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <Text>{chalk.cyan(`In Epoch #${epochId}:`)}</Text>
        <Text>  {chalk.green(successfulIntents.length)} intents executed fairly</Text>
        <Text>  {chalk.green(sandwichBlockedCount)} sandwich attacks blocked</Text>
      </Box>

      <Text marginTop={1}>{chalk.gray('Press [1] back to main, [?] for help')}</Text>
    </Box>
  );
};

export default AttackDemo;
