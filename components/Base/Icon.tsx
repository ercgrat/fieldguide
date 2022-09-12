import * as Icons from '@tabler/icons';
import { FC, SVGAttributes } from 'react';

interface TablerIconProps extends Omit<SVGAttributes<SVGElement>, 'stroke'> {
  color?: string;
  size?: string | number;
  stroke?: string | number;
}

type TablerIcon = FC<TablerIconProps>;

type IconKey<T = keyof typeof Icons> = T extends `Icon${infer Suffix}` ? Suffix : never;

const Icon = Object.fromEntries(Object.entries(Icons).map(([k, v]) => [k.slice(4), v])) as Record<
  IconKey,
  TablerIcon
>;
export default Icon;
