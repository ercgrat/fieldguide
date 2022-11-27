import { forwardRef, Link as ChakraLink } from '@chakra-ui/react';

const Link = forwardRef((props, ref) => <ChakraLink as="button" {...props} ref={ref} />);

export default Link;
