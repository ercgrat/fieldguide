import { Button as ChakraButton, ButtonProps, forwardRef } from '@chakra-ui/react';
import { ButtonVariant } from 'fgui/componentStyles/Button';
import { Spinner } from 'fgui';

type Props = Omit<ButtonProps, 'variant'> & {
  loading?: boolean;
  variant?: ButtonVariant;
};
const Button = forwardRef<Props, 'button'>(
  ({ children, loading, size = 'md', variant = 'secondary', ...props }, ref) => (
    <ChakraButton size={size} variant={variant} {...props} ref={ref}>
      {loading && <Spinner mr={2} size="sm" />} {children}
    </ChakraButton>
  )
);

export default Button;
