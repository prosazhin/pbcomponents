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

export interface IconProps<T> extends BaseIconProps {
  tag: T;
}

const Icon = forwardRef<SVGSVGElement, IconProps<SvgType>>((props, ref) => {
  const { className, tag: TagName, size = 'm', ...rest } = props;

  return (
    <TagName
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
