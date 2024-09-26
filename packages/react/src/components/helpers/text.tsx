'use client';

import { MediumType, SMLSizeType, SpanHTMLAttributes, SpanType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseTextProps = SpanHTMLAttributes & MediumType & SMLSizeType;

export interface TextProps extends BaseTextProps {}

const Text = forwardRef<SpanType, TextProps>((props, ref) => {
  const { children, className, size = 'm', medium = false, ...rest } = props;

  return (
    <span
      ref={ref}
      {...rest}
      className={clsx(
        'pbc pbc-text-inherit pbc-select-none',
        size === 's' && (medium ? 'pbc-text-tm12' : 'pbc-text-t12'),
        size === 'm' && (medium ? 'pbc-text-tm16' : 'pbc-text-t16'),
        size === 'l' && (medium ? 'pbc-text-tm20' : 'pbc-text-t20'),
        className,
      )}
    >
      {children}
    </span>
  );
});

Text.displayName = 'Text';

export default Text;
