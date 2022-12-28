import { defineStyleConfig } from '@chakra-ui/react';

export default {
  Base: defineStyleConfig({
    baseStyle: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      maxHeight: '100%',
      overflow: 'clip'
    }
  }),
  Header: defineStyleConfig({
    baseStyle: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      p: 2,
      height: '48px',
      boxShadow: 'base',
      backgroundColor: 'forest.90',
      color: 'bark.10',
      gap: 3
    }
  }),
  Menu: defineStyleConfig({}),
  Content: defineStyleConfig({
    baseStyle: { flex: 1, overflowY: 'auto', height: '0px' }
  }),
  Footer: defineStyleConfig({
    baseStyle: {
      position: 'sticky',
      left: 0,
      bottom: 0,
      p: 2,
      width: '100vw',
      borderTop: 'solid 1px',
      borderColor: 'bark.15'
    }
  })
};
