import { useMemo } from 'react';

export const useBorderColor = (args: { isFocused: boolean; isHovered: boolean }) => {
  const { isFocused, isHovered } = args;
  return useMemo(
    () => `${isFocused ? 'cornflower.100' : isHovered ? 'cornflower.50' : 'bark.25'} !important`,
    [isFocused, isHovered]
  );
};
