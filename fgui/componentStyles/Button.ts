import { defineStyleConfig, SystemStyleInterpolation } from '@chakra-ui/react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'link';

const variants: Record<ButtonVariant, SystemStyleInterpolation> = {
  primary: {
    color: 'bark.10',
    background: 'cornflower.100',
    _active: {
      background: 'cornflower.120'
    },
    _hover: {
      background: 'cornflower.90',
      _disabled: {
        background: 'cornflower.50'
      }
    },
    _disabled: {
      background: 'cornflower.50'
    }
  },
  secondary: {
    color: 'bark.90',
    background: 'bark.5',
    border: 'solid 1px',
    borderColor: 'bark.25',
    _active: {
      background: 'bark.15'
    },
    _hover: {
      background: 'bark.10',
      _disabled: {
        background: 'bark.10'
      }
    },
    _disabled: {
      background: 'bark.10'
    }
  },
  outline: {
    borderColor: 'cornflower.100',
    color: 'cornflower.100',
    background: 'bark.5',
    _active: {
      borderColor: 'cornflower.120',
      color: 'cornflower.120',
      background: 'cornflower.20'
    },
    _hover: {
      borderColor: 'cornflower.90',
      color: 'cornflower.90',
      background: 'cornflower.10'
    }
  },
  danger: {
    color: 'bark.10',
    background: 'cardinal.100',
    _active: {
      background: 'cardinal.120'
    },
    _hover: {
      background: 'cardinal.90'
    }
  },
  link: {
    border: 'none',
    background: 'none',
    boxShadow: 'none',
    color: 'cornflower.90',
    _active: {
      border: 'solid 1px',
      borderColor: 'cornflower.100'
    },
    _hover: {
      background: 'cornflower.10'
    }
  }
};

export default defineStyleConfig({
  baseStyle: {
    borderRadius: '4px',
    boxShadow: '0 0.0625rem 0 rgba(0, 0, 0, 0.05)',
    _focus: {
      outline: 'solid 1px cornflower.100'
    }
  },
  sizes: {
    sm: {
      py: 1,
      px: 3,
      height: '28px'
    },
    md: {
      py: 1,
      px: 3,
      height: '36px'
    }
  },
  variants
});
