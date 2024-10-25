'use client';

import { DivHTMLAttrs, WrapperClassNameType } from '@/types';
import clsx from 'clsx';

type BaseContainerProps = DivHTMLAttrs & WrapperClassNameType;

export interface ContainerProps extends BaseContainerProps {
  size?: 'full' | 'm' | 's';
  leftAside?: React.ReactNode;
  leftAsideClassName?: string;
  rightAside?: React.ReactNode;
  rightAsideClassName?: string;
}

const Container = (props: ContainerProps) => {
  const {
    children,
    className,
    wrapperClassName,
    size = 'full',
    leftAside,
    leftAsideClassName,
    rightAside,
    rightAsideClassName,
    ...rest
  } = props;
  const hasAside = leftAside || rightAside;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc-relative pbc-m-auto pbc-w-full pbc-px-16 pbc-grid pbc-grid-cols-1 pbc-gap-16 lg:pbc-gap-24 xl:pbc-gap-24',
        size === 'full' && 'lg:pbc-px-24 xl:pbc-px-24',
        (size === 'm' || size === 's') && 'desktop:pbc-px-0',
        !hasAside && size === 'm' && 'md:pbc-w-736 lg:pbc-w-4/5 xl:pbc-w-1152',
        !hasAside && size === 's' && 'desktop:pbc-w-736',
        hasAside && size === 'full' && 'xl:pbc-grid-cols-[theme(width.aside),1fr,theme(width.aside)]',
        hasAside && (size === 'm' || size === 's') && 'xl:pbc-grid-cols-[theme(width.aside),theme(width.736),theme(width.aside)]',
        hasAside && size === 'm' && 'md:pbc-w-736 lg:pbc-w-4/5 xl:pbc-w-1152',
        hasAside && size === 's' && 'md:pbc-w-736 lg:pbc-w-736 xl:pbc-w-1152',
        wrapperClassName,
      )}
    >
      {leftAside && <aside className={leftAsideClassName}>{leftAside}</aside>}
      {children && (
        <div
          className={clsx(
            hasAside && !leftAside && size === 's' && 'xl:pbc-col-start-2',
            ((!rightAside && leftAside) || (rightAside && !leftAside)) && size !== 's' && 'xl:pbc-col-span-2',
            className,
          )}
        >
          {children}
        </div>
      )}
      {rightAside && <aside className={rightAsideClassName}>{rightAside}</aside>}
    </div>
  );
};

Container.displayName = 'Container';

export default Container;
