import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import type { Intent } from '../types/index.js';
import { formatHash } from '../utils/theme.js';

interface Props {
  intents: Intent[];
  selectedIdx: number;
}

const IntentsList: React.FC<Props> = ({ intents, selectedIdx }) => {
  const statusColor = {
    pending: 'yellow',
    locked: 'red',
    executed: 'green',
    failed: 'red',
  };

  return (
    <Box flexDirection="column" borderStyle="single" borderColor="green" paddingX={2} paddingY={1}>
      <Text>{chalk.green.bold('Intents Order Log')}</Text>
      <Box marginTop={1} flexDirection="column">
        {intents.length === 0 ? (
          <Text>{chalk.gray('(no intents submitted yet)')}</Text>
        ) : (
          intents.map((intent, idx) => (
            <Box key={intent.id}>
              <Text>
                {selectedIdx === idx ? chalk.inverse('> ') : '  '}
                {chalk.gray(`[${String(intent.order ?? idx).padStart(3, '0')}]`)} 
                {' '}
                {chalk.cyan(intent.user.slice(0, 12))}
                {' '}
                {chalk.yellow(`${intent.amount} ${intent.token}`)}
                {' '}
                {chalk[statusColor[intent.status]](intent.status.toUpperCase())}
                {' '}
                {chalk.gray(formatHash(intent.hash || ''))}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default IntentsList;
