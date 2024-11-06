'use client';

import { SMLSizeType, SvgType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

const ICON_SIZE = {
  s: 16,
  m: 20,
  l: 24,
} as const;

type BaseIconProps = React.SVGProps<SVGSVGElement> & SMLSizeType;

export interface IconProps extends BaseIconProps {
  tag: SvgType;
}

const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { tag: Component, size = 'm', className, ...rest } = props;

  return (
    <Component
      ref={ref}
      {...rest}
      width={ICON_SIZE[size]}
      height={ICON_SIZE[size]}
      className={clsx(
        'pbc pbc-bg-transparent pbc-text-inherit',
        size === 's' && 'pbc-size-16',
        size === 'm' && 'pbc-size-20',
        size === 'l' && 'pbc-size-24',
        className,
      )}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;
