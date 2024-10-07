'use client';

import { DivHTMLAttrs } from '@/types';
import clsx from 'clsx';

type BaseContainerProps = DivHTMLAttrs;

export interface ContainerProps extends BaseContainerProps {
  size?: 'full' | 'm' | 's';
}

const Container = (props: ContainerProps) => {
  const { children, className, size = 'full', ...rest } = props;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc-relative pbc-block',
        size === 'full' && 'pbc-w-full pbc-px-16',
        size === 'm' && 'md:pbc-w-736 lg:pbc-w-4/5 xl:pbc-w-1152 pbc-px-16 desktop:!pbc-px-0',
        size === 's' && 'desktop:pbc-w-736 pbc-px-16 desktop:!pbc-px-0',
        className,
      )}
    >
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export default Container;
