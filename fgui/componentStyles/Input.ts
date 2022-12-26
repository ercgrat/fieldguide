import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const baseStyle = definePartsStyle({
  field: {
    background: 'bark.5',
    fontSize: 'md',
    color: 'bark.90'
  },
  addon: {
    color: 'bark.90',
    backgroundColor: 'bark.10'
  }
});

export default defineMultiStyleConfig({ baseStyle });
