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
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20
  }
};

export default themeOverrides;
