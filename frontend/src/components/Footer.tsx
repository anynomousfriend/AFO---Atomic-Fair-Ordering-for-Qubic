import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';

interface Props {
  activeScreen: string;
}

const Footer: React.FC<Props> = ({ activeScreen }) => {
  return (
    <Box marginTop={1} paddingX={1} borderStyle="single" borderColor="gray">
      <Text>
        {chalk.gray('Screen: ')} {chalk.cyan(activeScreen)} 
        {chalk.gray('  │ [1] Main  [2] Intents  [3] Attack  [?] Help  [Q] Quit')}
      </Text>
    </Box>
  );
};

export default Footer;
