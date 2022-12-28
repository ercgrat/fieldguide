import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import textStyles from './textStyles';
import components from './componentStyles';
import shadows from './shadows';
import { Open_Sans } from '@next/font/google';
const openSans = Open_Sans({ subsets: ['latin'] });

const theme = extendTheme({
  colors,
  components,
  shadows,
  textStyles,
  fonts: {
    body: openSans.style.fontFamily,
    heading: openSans.style.fontFamily
  }
});

export default theme;
