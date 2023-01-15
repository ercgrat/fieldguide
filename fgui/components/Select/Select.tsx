import { Select as MantineSelect, SelectProps } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { Flex, useDisclosure } from 'fgui';
import { forwardRef, useCallback, useRef } from 'react';
import { Key } from 'ts-key-enum';
import InputLabel from '../Input/InputLabel';
import { useBorderColor } from '../Input/utils';

type Props = Omit<SelectProps, 'label'> & {
  label?: string;
};
const Select = forwardRef<HTMLInputElement, Props>(
  ({ label, searchable = true, ...props }, ref) => {
    const { isOpen: isFocused, onOpen: focus, onClose: blur } = useDisclosure();
    const { isOpen: isHovered, onOpen: onMouseIn, onClose: onMouseOut } = useDisclosure();

    const handleFocus = useCallback(() => {
      focus();
      inputRef.current?.select();
    }, [focus]);

    const borderColor = useBorderColor({ isFocused, isHovered });
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mergedInputRef = useMergedRef(ref, inputRef);

    return (
      <Flex direction="column" w="100%" ref={containerRef}>
        {label && <InputLabel label={label} />}
        <MantineSelect
          {...props}
          onBlur={blur}
          onFocus={handleFocus}
          onMouseOut={onMouseOut}
          onMouseOver={onMouseIn}
          ref={mergedInputRef}
          searchable={searchable}
          onKeyUp={e => {
            const keys: string[] = [Key.Enter, Key.ArrowDown, Key.ArrowUp];
            if (
              !keys.includes(e.key) &&
              containerRef.current &&
              inputRef.current &&
              !!containerRef.current.querySelector('.mantine-Select-item[aria-selected="false"]') &&
              !containerRef.current.querySelector('.mantine-Select-item[aria-selected="true"]')
            ) {
              inputRef.current.dispatchEvent(
                new KeyboardEvent('keydown', {
                  key: Key.ArrowDown,
                  bubbles: true
                })
              );
            }
          }}
          sx={{
            position: 'relative',
            input: { border: 'solid 1px', borderColor },
            '.mantine-Select-dropdown': {
              position: 'fixed'
            },
            '.mantine-Select-item': {
              transition: 'background-color .3s'
            }
          }}
        />
      </Flex>
    );
  }
);

export default Select;
