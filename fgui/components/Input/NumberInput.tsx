import {
  forwardRef,
  NumberInput as ChakraNumberInput,
  NumberInputProps,
  Stack
} from '@chakra-ui/react';
import { T } from '../Text';

type Props = NumberInputProps & {
  label?: string;
};
const NumberInput = forwardRef<Props, 'input'>(({ label, ...props }, ref) => (
  <Stack>
    {label && <T.Label>{label}</T.Label>}
    <ChakraNumberInput ref={ref} {...props} />
  </Stack>
));

export default NumberInput;
