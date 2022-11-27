import { Card as ChakraCard, forwardRef, useStyleConfig } from '@chakra-ui/react';

const Card = forwardRef((props, ref) => {
  const styles = useStyleConfig('Card');

  return <ChakraCard __css={styles} {...props} ref={ref} />;
});

export default Card;
