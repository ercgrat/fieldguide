import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    dialog: {
      maxHeight: '90vh',
      overflow: 'hidden'
    },
    header: {
      p: 0
    },
    body: {
      p: 4,
      overflowY: 'auto'
    },
    footer: {
      p: 0,
      height: 'fit-content'
    }
  }
});
