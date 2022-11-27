import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    control: {
      position: 'relative',
      borderWidth: '1px',
      borderColor: 'bark.40',
      _checked: {
        background: 'bark.5',
        borderColor: 'cornflower.100',
        _before: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bg: 'cornflower.100',
          w: '10px',
          h: '10px'
        },

        _hover: {
          borderColor: 'cornflower.100',
          bg: 'bark.5'
        },

        _disabled: {
          bg: 'bark.40',
          color: 'bark.5'
        }
      }
    }
  },
  sizes: {
    sm: {
      control: {
        width: '14px',
        height: '14px',
        _checked: {
          _before: {
            w: '6px',
            h: '6px'
          }
        },
        _hover: {
          _before: {
            w: '6px',
            h: '6px'
          }
        }
      },
      label: { fontSize: 'sm' }
    },
    md: {
      control: {
        width: '18px',
        height: '18px',
        _checked: {
          _before: {
            w: '9px',
            h: '9px'
          }
        },
        _hover: {
          _before: {
            w: '9px',
            h: '9px'
          }
        }
      },
      label: { fontSize: 'md' }
    }
  }
});
