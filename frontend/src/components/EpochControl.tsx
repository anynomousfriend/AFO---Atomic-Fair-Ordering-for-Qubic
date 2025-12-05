import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import type { EpochPhase } from '../types/index.js';
import { generateProgressBar } from '../utils/theme.js';

interface Props {
  epochId: number;
  phase: EpochPhase;
  progress: number;
  intentsCount: number;
  onClose: () => void;
  onExecute: () => void;
  onReset: () => void;
  onSubmitIntent: (amount: number, token: string) => void;
}

const EpochControl: React.FC<Props> = ({
  epochId,
  phase,
  progress,
  intentsCount,
}) => {
  const phaseColor = phase === 'open' ? 'yellow' : phase === 'locked' ? 'red' : 'green';
  const progressBar = generateProgressBar(progress);

  return (
    <Box flexDirection="column" borderStyle="single" borderColor="cyan" paddingX={2} paddingY={1}>
      <Box>
        <Text>{chalk.cyan('Epoch #')} {chalk.bold(epochId.toString())} </Text>
        <Text>│ </Text>
        <Text>{chalk[phaseColor](phase.toUpperCase())} </Text>
        <Text>│ </Text>
        <Text>{chalk.gray(`${intentsCount} intents`)}</Text>
      </Box>

      <Box marginTop={1}>
        <Text>{chalk.gray('[' + progressBar + '] ' + progress + '%')}</Text>
      </Box>

      <Box marginTop={1}>
        <Text>{chalk.green('[C]')} Close Epoch  </Text>
        <Text>{chalk.green('[E]')} Execute  </Text>
        <Text>{chalk.green('[R]')} Reset  </Text>
        <Text>{chalk.green('[A]')} Add Intent</Text>
      </Box>
    </Box>
  );
};

export default EpochControl;
