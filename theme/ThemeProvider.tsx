import { MantineProvider } from '@mantine/core';
import { memo } from 'react';
import themeOverrides from './themeOverrides';

const ThemeProvider: Relay.FCWithChildren = ({ children }) => (
  <MantineProvider theme={themeOverrides}>{children}</MantineProvider>
);

export default memo(ThemeProvider);
