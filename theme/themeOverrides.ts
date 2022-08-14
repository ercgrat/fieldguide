import { MantineThemeOverride } from '@mantine/core';
import { colors } from '.';

const themeOverrides: MantineThemeOverride = {
  colors,
  fontSizes: {
    xs: 10,
    sm: 14,
    md: 18,
    lg: 24,
    xl: 36
  }
};

export default themeOverrides;
