import { Tuple } from '@mantine/core';

type CustomColors = 'purple' | 'cinnabar' | 'honeydew' | 'middleBlue' | 'davysGrey';

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, Tuple<string, 10>>;
  }
}
