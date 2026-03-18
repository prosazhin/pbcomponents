'use client';

import { MediumType, PolymorphicProps, SMLSizeType } from '@/types';
import clsx from 'clsx';
import { ElementType, ReactNode } from 'react';

const defaultElement = 'span';

type BaseTextProps = MediumType & SMLSizeType;
export interface TextProps extends BaseTextProps {
  children?: ReactNode;
}

const Text = <Element extends ElementType = typeof defaultElement>(props: PolymorphicProps<Element, TextProps>) => {
  const { as: Component = defaultElement, size = 'm', medium = false, children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...rest}
      className={clsx(
        'pbc pbc:text-inherit',
        size === 's' && (medium ? 'pbc:text-tm12' : 'pbc:text-t12'),
        size === 'm' && (medium ? 'pbc:text-tm16' : 'pbc:text-t16'),
        size === 'l' && (medium ? 'pbc:text-tm20' : 'pbc:text-t20'),
        className,
      )}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';
export default Text;
