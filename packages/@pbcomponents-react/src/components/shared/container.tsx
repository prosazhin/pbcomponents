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
    size = 'full',
    leftAside,
    leftAsideClassName,
    rightAside,
    rightAsideClassName,
    children,
    className,
    wrapperClassName,
    ...rest
  } = props;
  const hasAside = leftAside || rightAside;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc:relative pbc:m-auto pbc:w-full pbc:px-16 pbc:grid pbc:grid-cols-1 pbc:gap-16 pbc:lg-min:gap-24',
        size === 'full' && 'pbc:lg-min:px-24',
        (size === 'm' || size === 's') && 'pbc:desktop:px-0',
        !hasAside && size === 'm' && 'pbc:md-min:w-736 pbc:lg-min:w-4/5 pbc:xl:w-1152',
        !hasAside && size === 's' && 'pbc:desktop:w-736',
        hasAside && size === 'full' && 'pbc:xl:grid-cols-[184px_1fr_184px]',
        hasAside && (size === 'm' || size === 's') && 'pbc:xl:grid-cols-[184px_736px_184px]',
        hasAside && size === 'm' && 'pbc:md-min:w-736 pbc:lg-min:w-4/5 pbc:xl:w-1152',
        hasAside && size === 's' && 'pbc:md-min:w-736 pbc:lg-min:w-736 pbc:xl:w-1152',
        wrapperClassName,
      )}
    >
      {leftAside && <aside className={leftAsideClassName}>{leftAside}</aside>}
      {children && (
        <div
          className={clsx(
            hasAside && !leftAside && size === 's' && 'pbc:xl:col-start-2',
            ((!rightAside && leftAside) || (rightAside && !leftAside)) && size !== 's' && 'pbc:xl:col-span-2',
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
