import {
  forwardRef,
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
  useDisclosure
} from '@chakra-ui/react';
import { Flex } from 'fgui';
import { useCallback } from 'react';
import InputLabel from './InputLabel';
import { fieldStyles } from './styles';

type Props = Omit<InputProps, 'required'> & {
  label?: string;
  rightAddon?: React.ReactNode;
};
const TextInput = forwardRef<Props, 'input'>(
  ({ label, rightAddon, isRequired, onFocus, onBlur, ...props }, ref) => {
    const { isOpen: isFocused, onOpen: focus, onClose: blur } = useDisclosure();
    const { isOpen: isHovered, onOpen: onMouseIn, onClose: onMouseOut } = useDisclosure();
    const borderColor = `${
      isFocused ? 'cornflower.100' : isHovered ? 'cornflower.50' : 'bark.25'
    } !important`;

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        focus();
        onFocus?.(e);
      },
      [focus, onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        blur();
        onBlur?.(e);
      },
      [blur, onBlur]
    );

    return (
      <Flex direction="column" w="100%">
        <InputLabel isRequired={isRequired} label={label} />
        <InputGroup>
          <Input
            {...fieldStyles}
            borderColor={borderColor}
            borderRight={rightAddon ? 'none !important' : undefined}
            isRequired={isRequired}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseIn}
            ref={ref}
            {...props}
          />
          {rightAddon && (
            <InputRightAddon borderColor={borderColor} borderLeft="none" h="36px">
              {rightAddon}
            </InputRightAddon>
          )}
        </InputGroup>
      </Flex>
    );
  }
);

export default TextInput;
