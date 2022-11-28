import { chakra, forwardRef } from '@chakra-ui/react';
import { T } from 'fgui';
import React from 'react';

const Item = chakra('div', {
  baseStyle: {
    w: '100%',
    bg: 'transparent',
    cursor: 'pointer',
    borderBottom: 'solid 1px',
    borderColor: 'bark.20',
    p: 2,
    _hover: {
      bg: 'sand.10'
    },
    _active: {
      bg: 'sand.20'
    }
  }
});

const MenuItem = forwardRef<React.ComponentProps<typeof Item>, 'div'>(
  ({ children, ...props }, ref) => {
    return (
      <Item {...props} ref={ref}>
        <T.BodyMd alignItems="center" display="flex" gap={2}>
          {children}
        </T.BodyMd>
      </Item>
    );
  }
);

export default MenuItem;
