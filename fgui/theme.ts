import { useTheme as useChakraTheme, extendTheme } from '@chakra-ui/react';
import colors from './colors';
import textStyles from './textStyles';
import components from './componentStyles';
import shadows from './shadows';
import { Open_Sans } from '@next/font/google';
const openSans = Open_Sans({ subsets: ['latin'] });

const themeOverrides = {
  colors,
  components,
  shadows,
  textStyles,
  fonts: {
    body: openSans.style.fontFamily,
    heading: openSans.style.fontFamily
  }
};

const theme = extendTheme(themeOverrides);
export type ChakraTheme = typeof themeOverrides;
export const useTheme = (): ChakraTheme => useChakraTheme<ChakraTheme>();

export default theme;
