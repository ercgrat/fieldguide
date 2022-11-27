import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    header: {
      p: 2,
      w: '100%'
    },
    body: {
      p: 2
    },
    overlay: {
      opacity: '0.2 !important',
      background: 'bark.50'
    }
  }
});
