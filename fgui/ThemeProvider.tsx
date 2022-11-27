import { ChakraProvider } from '@chakra-ui/react';
import { memo } from 'react';
import theme from './theme';

type Props = {
  children: React.ReactNode;
};
const ThemeProvider: React.FC<Props> = ({ children }) => (
  <ChakraProvider resetCSS={true} theme={theme}>
    {children}
  </ChakraProvider>
);

export default memo(ThemeProvider);
