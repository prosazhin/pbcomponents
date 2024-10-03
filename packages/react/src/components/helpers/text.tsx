'use client';

import { MediumType, PolymorphicProps, SMLSizeType } from '@/types';
import clsx from 'clsx';

const defaultElement = 'span';

type BaseTextProps = MediumType & SMLSizeType;

export interface TextProps extends BaseTextProps {
  children?: string;
}

const Text = <Element extends React.ElementType = typeof defaultElement>(props: PolymorphicProps<Element, TextProps>) => {
  const { as: Component = defaultElement, children, className, size = 'm', medium = false, ...rest } = props;

  if (!children) return null;

  return (
    <Component
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
    </Component>
  );
};

Text.displayName = 'Text';

export default Text;
