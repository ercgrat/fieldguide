import { defineStyleConfig, ComponentStyleConfig } from '@chakra-ui/react';

const CardStyles: ComponentStyleConfig = defineStyleConfig({
  baseStyle: {
    borderRadius: '4px',
    p: 0,
    shadow: 'base',
    overflow: 'hidden',

    Body: {
      w: '100%'
    }
  }
});

export default CardStyles;
