import { forwardRef, Text as ChakraText, TextProps } from '@chakra-ui/react';

const Text = forwardRef(({ children, ...props }, ref) => (
  <ChakraText {...props} ref={ref}>
    {children}
  </ChakraText>
));

type TextType = 'H1' | 'H2' | 'H3' | 'Body1' | 'Body2' | 'Body3' | 'Label' | 'Caption';

export const T: { [key in TextType]: React.FC<TextProps> } = {
  H1: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="h1">
      {children}
    </Text>
  )),
  H2: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="h2">
      {children}
    </Text>
  )),
  H3: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="h3">
      {children}
    </Text>
  )),
  Body1: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="body1">
      {children}
    </Text>
  )),
  Body2: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="body2">
      {children}
    </Text>
  )),
  Body3: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="body3">
      {children}
    </Text>
  )),
  Label: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} color="bark.70" ref={ref} textStyle="label">
      {children}
    </Text>
  )),
  Caption: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="caption">
      {children}
    </Text>
  ))
};

export default Text;
