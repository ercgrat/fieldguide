import { forwardRef, Input, InputGroup, InputProps, InputRightAddon } from '@chakra-ui/react';
import { Flex, T } from 'fgui';

type Props = InputProps & {
  label?: string;
  rightAddon?: React.ReactNode;
};
const TextInput = forwardRef<Props, 'input'>(({ label, rightAddon, ...props }, ref) => {
  return (
    <Flex direction="column" w="100%">
      {label && <T.Label mb={1}>{label}</T.Label>}
      <InputGroup>
        <Input
          _focus={{ borderColor: 'cornflower.100', boxShadow: 'none' }}
          _hover={{ borderColor: 'cornflower.50' }}
          _placeholder={{ color: 'bark.40', fontSize: 'sm' }}
          borderColor="bark.25"
          borderRadius="3px"
          borderRight={rightAddon ? 'none' : undefined}
          height="36px"
          outline="none"
          px={2.5}
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
