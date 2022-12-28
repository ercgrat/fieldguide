import { ComponentWithAs, forwardRef, Text as ChakraText, TextProps } from '@chakra-ui/react';

const Text = forwardRef(({ children, ...props }, ref) => (
  <ChakraText as="div" {...props} ref={ref}>
    {children}
  </ChakraText>
));

type TextType =
  | 'Heading4xl'
  | 'Heading3xl'
  | 'Heading2xl'
  | 'HeadingXl'
  | 'HeadingLg'
  | 'HeadingMd'
  | 'HeadingSm'
  | 'BodyLg'
  | 'BodyMd'
  | 'BodySm'
  | 'Label';

export const T: { [key in TextType]: ComponentWithAs<'div', TextProps> } = {
  Heading4xl: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="heading4xl">
      {children}
    </Text>
  )),
  Heading3xl: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="heading3xl">
      {children}
    </Text>
  )),
  Heading2xl: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="heading2xl">
      {children}
    </Text>
  )),
  HeadingXl: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="headingXl">
      {children}
    </Text>
  )),
  HeadingLg: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="headingLg">
      {children}
    </Text>
  )),
  HeadingMd: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="headingMd">
      {children}
    </Text>
  )),
  HeadingSm: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="headingSm">
      {children}
    </Text>
  )),
  BodyLg: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="bodyLg">
      {children}
    </Text>
  )),
  BodyMd: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="bodyMd">
      {children}
    </Text>
  )),
  BodySm: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} ref={ref} textStyle="bodySm">
      {children}
    </Text>
  )),
  Label: forwardRef<TextProps, 'div'>(({ children, ...props }, ref) => (
    <Text {...props} color="bark.70" ref={ref} textStyle="label">
      {children}
    </Text>
  ))
};

export default Text;
