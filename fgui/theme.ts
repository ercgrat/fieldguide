import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import textStyles from './textStyles';
import components from './componentStyles';
import shadows from './shadows';

const theme = extendTheme({ colors, components, shadows, textStyles });

export default theme;
