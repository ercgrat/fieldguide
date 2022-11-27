import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    borderRadius: '2px',
    pointerEvents: 'auto',
    display: 'flex',
    _focus: {
      outline: 'solid 1px cornflower.100'
    }
  }
});
