import { menuAnatomy as parts } from '@chakra-ui/anatomy';

import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  list: {
    py: 1
  },
  item: {
    alignItems: 'baseline'
  }
});

export default defineMultiStyleConfig({
  baseStyle
});
