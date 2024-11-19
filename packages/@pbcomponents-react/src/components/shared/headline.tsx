'use client';

import { HeadlineHTMLAttrs } from '@/types';
import clsx from 'clsx';

const defaultElement = 'h1';

type BaseHeadlineProps = HeadlineHTMLAttrs;
export interface HeadlineProps extends BaseHeadlineProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Headline = ({ as: Component = defaultElement, children, className, ...rest }: HeadlineProps) => {
  if (!children) return null;

  return (
    <Component
      {...rest}
      className={clsx(
        'pbc pbc-w-full pbc-block',
        Component === 'h1' && 'pbc-text-h64',
        Component === 'h2' && 'pbc-text-h48',
        Component === 'h3' && 'pbc-text-h32',
        Component === 'h4' && 'pbc-text-h24',
        Component === 'h5' && 'pbc-text-h20',
        Component === 'h6' && 'pbc-text-h16',
        className,
      )}
    >
      {children}
    </Component>
  );
};

Headline.displayName = 'Headline';

export default Headline;
