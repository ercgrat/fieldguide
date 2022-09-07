import { MantineProvider } from '@mantine/core';
import { memo } from 'react';
import themeOverrides from './themeOverrides';

type Props = {
  children: React.ReactNode;
};
const ThemeProvider: React.FC<Props> = ({ children }) => (
  <MantineProvider theme={themeOverrides}>{children}</MantineProvider>
);

export default memo(ThemeProvider);
