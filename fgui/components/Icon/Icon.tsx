import * as FeatherIcons from 'react-feather';

import { forwardRef, Icon as ChakraIcon, IconProps as ChakraIconProps } from '@chakra-ui/react';

import { FieldGuideIconKey, FieldGuideIcons } from './customIcons';

export type IconProps = Omit<ChakraIconProps, 'w' | 'h' | 'size'>;
const IconBase = forwardRef<IconProps, 'svg'>((props, ref) => (
  <ChakraIcon
    h="1em"
    ref={ref}
    size="1em"
    w="1em"
    {...(props.color ? { color: props.color } : null)}
    {...(props.backgroundColor ? { backgroundColor: props.backgroundColor } : null)}
    {...props}
  />
));

const SiloIconDictionary: { [key in FieldGuideIconKey]: typeof IconBase } = Object.fromEntries(
  Object.keys(FieldGuideIconKey).map(k => [
    k,
    forwardRef<IconProps, 'svg'>(({ as, ...props }, ref) => (
      <IconBase as={(FieldGuideIcons as any)[k]} key={k} ref={ref} {...props} />
    ))
  ])
) as { [key in FieldGuideIconKey]: typeof IconBase };

const FeatherIconDictionary: {
  [key in keyof typeof FeatherIcons]: typeof IconBase;
} = Object.fromEntries(
  Object.keys(FeatherIcons).map(k => [
    k,
    forwardRef<IconProps, 'svg'>(({ as, ...props }, ref) => (
      <IconBase as={(FeatherIcons as any)[k]} key={k} ref={ref} {...props} />
    ))
  ])
) as { [key in keyof typeof FeatherIcons]: typeof IconBase };

const Icon: typeof IconBase & typeof FeatherIconDictionary & typeof SiloIconDictionary =
  Object.assign(Object.assign(IconBase, FeatherIconDictionary), SiloIconDictionary);

export { Icon };
