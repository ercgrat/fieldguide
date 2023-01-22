import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const baseStyle = definePartsStyle({
  field: {
    background: 'bark.5',
    fontSize: 'md',
    color: 'bark.90',
    flex: 1
  },
  addon: {
    color: 'bark.90',
    backgroundColor: 'bark.10',
    transitionProperty: 'border-color',
    transitionDuration: 'normal',
    borderRadius: '4px',
    px: 3
  }
});

export default defineMultiStyleConfig({ baseStyle });
