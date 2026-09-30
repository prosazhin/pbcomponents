'use client';

import { MediumType, PolymorphicProps, TextSizeType } from '@/types';
import clsx from 'clsx';
import { ElementType, ReactNode } from 'react';

const defaultElement = 'span';

type BaseTextProps = MediumType & TextSizeType;
export interface TextProps extends BaseTextProps {
  children?: ReactNode;
}

const Text = <Element extends ElementType = typeof defaultElement>(props: PolymorphicProps<Element, TextProps>) => {
  const { as: Component = defaultElement, size = 16, medium = false, children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...rest}
      className={clsx(
        'pbc',
        size === 10 && (medium ? 'pbc:text-tm10' : 'pbc:text-t10'),
        size === 12 && (medium ? 'pbc:text-tm12' : 'pbc:text-t12'),
        size === 14 && (medium ? 'pbc:text-tm14' : 'pbc:text-t14'),
        size === 16 && (medium ? 'pbc:text-tm16' : 'pbc:text-t16'),
        size === 20 && (medium ? 'pbc:text-tm20' : 'pbc:text-t20'),
        size === 24 && (medium ? 'pbc:text-tm24' : 'pbc:text-t24'),
        size === 32 && (medium ? 'pbc:text-tm32' : 'pbc:text-t32'),
        className,
      )}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';
export default Text;
