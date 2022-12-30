import { useMemo } from 'react';
import { useTheme } from 'fgui';

export const useBorderColor = (args: { isFocused: boolean; isHovered: boolean }) => {
  const { isFocused, isHovered } = args;
  const theme = useTheme();
  return useMemo(
    () =>
      `${
        isFocused
          ? theme.colors.cornflower[100]
          : isHovered
          ? theme.colors.cornflower[50]
          : theme.colors.bark[25]
      } !important`,
    [isFocused, isHovered, theme.colors.bark, theme.colors.cornflower]
  );
};
