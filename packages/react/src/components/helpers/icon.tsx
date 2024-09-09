import { ICON_SIZE } from '@/consts';
import { ComponentType, IconType } from '@/types';
import clsx from 'clsx';

export type Props = ComponentType & {
  tag: IconType;
  size: 's' | 'm' | 'l';
};

const Icon = ({ className, tag: IconTag, size }: Props) => (
  <IconTag
    width={ICON_SIZE[size]}
    height={ICON_SIZE[size]}
    className={clsx(
      'pbc pbc-bg-transparent pbc-text-inherit',
      size === 's' && 'pbc-size-16',
      size === 'm' && 'pbc-size-24',
      size === 'l' && 'pbc-size-28',
      className,
    )}
  />
);

export default Icon;
