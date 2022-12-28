import { tableAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  table: {
    border: 'solid 1px',
    borderColor: 'bark.25',
    borderRadius: '4px',
    borderCollapse: 'separate',
    borderSpacing: 0
  },
  th: {
    backgroundColor: 'bark.15'
  }
});

const sizes = {
  md: definePartsStyle({
    th: {
      px: 2,
      py: 1
    },
    td: {
      px: 2,
      py: 1
    }
  })
};

export default defineMultiStyleConfig({
  baseStyle,
  sizes
});
