import React from 'react';
import { Text, TextProps } from '@mantine/core';

const Body = React.forwardRef<HTMLDivElement, TextProps>(({ children, ...props }, ref) => (
  <Text ref={ref} {...props}>
    {children}
  </Text>
));

const Label = React.forwardRef<HTMLDivElement, TextProps>(({ children, ...props }, ref) => (
  <Text color="honeydew" ref={ref} size="sm" {...props}>
    {children}
  </Text>
));

const Title = React.forwardRef<HTMLDivElement, TextProps>(({ children, ...props }, ref) => (
  <Text ref={ref} size="lg" weight="bold" {...props}>
    {children}
  </Text>
));

export default {
  Body,
  Label,
  Title
};
