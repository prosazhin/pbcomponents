'use client';

import { IconSizeType, SvgType } from '@/types';
import clsx from 'clsx';
import { SVGProps } from 'react';

type BaseIconProps = Omit<SVGProps<SVGSVGElement>, 'size'> & IconSizeType;
export interface IconProps extends BaseIconProps {
  tag: SvgType;
}

const Icon = (props: IconProps) => {
  const { tag: Component, size = 18, className, ...rest } = props;

  return (
    <Component
      {...rest}
      width={size}
      height={size}
      className={clsx(
        'pbc pbc:shrink-0 pbc:bg-transparent',
        size === 12 && 'pbc:size-12',
        size === 14 && 'pbc:size-14',
        size === 16 && 'pbc:size-16',
        size === 18 && 'pbc:size-18',
        size === 20 && 'pbc:size-20',
        size === 22 && 'pbc:size-22',
        size === 24 && 'pbc:size-24',
        size === 26 && 'pbc:size-26',
        size === 32 && 'pbc:size-32',
        className,
      )}
    />
  );
};

Icon.displayName = 'Icon';
export default Icon;
