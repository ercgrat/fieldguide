import { forwardRef, Input, InputGroup, InputProps, InputRightAddon } from '@chakra-ui/react';
import { Flex } from 'fgui';
import InputLabel from './InputLabel';
import { fieldStyles } from './styles';

type Props = Omit<InputProps, 'required'> & {
  label?: string;
  rightAddon?: React.ReactNode;
};
const TextInput = forwardRef<Props, 'input'>(({ label, rightAddon, isRequired, ...props }, ref) => {
  return (
    <Flex direction="column" w="100%">
      <InputLabel isRequired={isRequired} label={label} />
      <InputGroup>
        <Input
          {...fieldStyles}
          borderRight={rightAddon ? 'none' : undefined}
          isRequired={isRequired}
          ref={ref}
          {...props}
        />
        {rightAddon && (
          <InputRightAddon
            _focus={{ borderColor: 'cornflower.100' }}
            _hover={{ borderColor: 'cornflower.50' }}
            background="bark.10"
            borderColor="bark.25"
            borderLeft="none"
            color="bark.90"
            h="36px"
          >
            {rightAddon}
          </InputRightAddon>
        )}
      </InputGroup>
    </Flex>
  );
});

export default TextInput;
