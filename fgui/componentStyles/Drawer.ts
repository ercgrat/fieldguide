import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    header: {
      p: 0,
      w: '100%'
    },
    body: {
      p: 0,
      w: '100%'
    },
    overlay: {
      opacity: '0.2 !important',
      background: 'bark.60'
    }
  }
});
