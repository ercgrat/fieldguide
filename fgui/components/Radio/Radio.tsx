import {
  forwardRef,
  Radio,
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps
} from '@chakra-ui/react';
import { HStack } from 'fgui';

type Props = RadioGroupProps;
const RadioGroup = forwardRef<Props, 'div'>(({ children, ...props }, ref) => (
  <ChakraRadioGroup {...props} ref={ref}>
    <HStack gap={2}>{children}</HStack>
  </ChakraRadioGroup>
));

export { RadioGroup };
export default Radio;
