import { Select as MantineSelect, SelectProps } from '@mantine/core';
import { Flex, useDisclosure } from 'fgui';
import { forwardRef } from 'react';
import InputLabel from '../Input/InputLabel';
import { useBorderColor } from '../Input/utils';

type Props = Omit<SelectProps, 'label'> & {
  label?: string;
};
const Select = forwardRef<HTMLInputElement, Props>(
  ({ label, searchable = true, ...props }, ref) => {
    const { isOpen: isFocused, onOpen: focus, onClose: blur } = useDisclosure();
    const { isOpen: isHovered, onOpen: onMouseIn, onClose: onMouseOut } = useDisclosure();
    const borderColor = useBorderColor({ isFocused, isHovered });

    return (
      <Flex direction="column" w="100%">
        {label && <InputLabel label={label} />}
        <MantineSelect
          {...props}
          onBlur={blur}
          onFocus={focus}
          onMouseOut={onMouseOut}
          onMouseOver={onMouseIn}
          ref={ref}
          searchable={searchable}
          sx={{ position: 'relative', input: { border: 'solid 1px', borderColor } }}
        />
      </Flex>
    );
  }
);

export default Select;
