import {
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  forwardRef,
  useStyleConfig
} from '@chakra-ui/react';
import { Divider, T } from 'fgui';

const CardBase = forwardRef<CardProps, 'div'>(({ children, ...props }, ref) => {
  const styles = useStyleConfig('Card');
  return (
    <ChakraCard __css={styles} {...props} ref={ref}>
      {children}
    </ChakraCard>
  );
});

const Card = Object.assign(CardBase, {
  Header: forwardRef(({ children, ...props }, ref) => (
    <>
      <CardHeader px={4} py={2} {...props} ref={ref}>
        <T.HeadingMd>{children}</T.HeadingMd>
      </CardHeader>
      <Divider />
    </>
  )),
  Body: forwardRef((props, ref) => {
    const styles = useStyleConfig('Card.Body');
    return <CardBody __css={styles} px={4} py={2} {...props} ref={ref} />;
  }),
  Footer: forwardRef((props, ref) => (
    <>
      <Divider />
      <CardFooter p={2} {...props} ref={ref} />
    </>
  ))
});

export default Card as typeof CardBase;
