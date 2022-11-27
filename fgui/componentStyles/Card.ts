import { defineStyleConfig, ComponentStyleConfig } from '@chakra-ui/react';

const CardStyles: ComponentStyleConfig = defineStyleConfig({
  baseStyle: {
    borderRadius: '4px',
    p: 6,
    shadow: 'md'
  }
});

export default CardStyles;
