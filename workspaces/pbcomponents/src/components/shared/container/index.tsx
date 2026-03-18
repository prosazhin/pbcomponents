'use client';

import { WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { Children, HTMLAttributes, ReactElement, ReactNode, isValidElement, useMemo } from 'react';

type BaseContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & WrapperClassNameType;
export interface ContainerProps extends BaseContainerProps {
  size?: 'full' | 'm' | 's';
  children?: ReactNode;
}

export interface ContainerAsideProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode;
}

export interface ContainerMainProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

const ContainerLeftAside = (props: ContainerAsideProps) => {
  void props;

  return null;
};
ContainerLeftAside.displayName = 'Container.LeftAside';

const ContainerRightAside = (props: ContainerAsideProps) => {
  void props;

  return null;
};
ContainerRightAside.displayName = 'Container.RightAside';

const ContainerMain = (props: ContainerMainProps) => {
  void props;

  return null;
};
ContainerMain.displayName = 'Container.Main';

const Container = (props: ContainerProps) => {
  const { size = 'full', children, className, wrapperClassName, ...rest } = props;

  const { leftAsideProps, rightAsideProps, mainProps } = useMemo<{
    leftAsideProps: ContainerAsideProps | null;
    rightAsideProps: ContainerAsideProps | null;
    mainProps: ContainerMainProps | null;
  }>(() => {
    let nextLeftAsideProps: ContainerAsideProps | null = null;
    let nextRightAsideProps: ContainerAsideProps | null = null;
    let nextMainProps: ContainerMainProps | null = null;
    const fallbackMainChildren: ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        if (child !== null && child !== undefined) {
          fallbackMainChildren.push(child);
        }

        return;
      }

      if (child.type === ContainerLeftAside) {
        nextLeftAsideProps = (child as ReactElement<ContainerAsideProps>).props;

        return;
      }

      if (child.type === ContainerRightAside) {
        nextRightAsideProps = (child as ReactElement<ContainerAsideProps>).props;

        return;
      }

      if (child.type === ContainerMain) {
        nextMainProps = (child as ReactElement<ContainerMainProps>).props;

        return;
      }

      fallbackMainChildren.push(child);
    });

    if (!nextMainProps && fallbackMainChildren.length) {
      nextMainProps = { children: fallbackMainChildren };
    }

    return {
      leftAsideProps: nextLeftAsideProps,
      rightAsideProps: nextRightAsideProps,
      mainProps: nextMainProps,
    };
  }, [children]);

  const hasLeftAside = Boolean(leftAsideProps?.children);
  const hasRightAside = Boolean(rightAsideProps?.children);
  const hasAside = hasLeftAside || hasRightAside;

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
        className,
        wrapperClassName,
      )}
    >
      {leftAsideProps?.children && (
        <aside {...leftAsideProps} className={leftAsideProps.className}>
          {leftAsideProps.children}
        </aside>
      )}
      {mainProps?.children && (
        <div
          {...mainProps}
          className={clsx(
            hasAside && !hasLeftAside && size === 's' && 'pbc:xl:col-start-2',
            ((hasRightAside && !hasLeftAside) || (!hasRightAside && hasLeftAside)) && size !== 's' && 'pbc:xl:col-span-2',
            mainProps.className,
          )}
        >
          {mainProps.children}
        </div>
      )}
      {rightAsideProps?.children && (
        <aside {...rightAsideProps} className={rightAsideProps.className}>
          {rightAsideProps.children}
        </aside>
      )}
    </div>
  );
};

Container.displayName = 'Container';

const ContainerCompound: typeof Container & {
  Main: typeof ContainerMain;
  LeftAside: typeof ContainerLeftAside;
  RightAside: typeof ContainerRightAside;
} = Object.assign(Container, {
  Main: ContainerMain,
  LeftAside: ContainerLeftAside,
  RightAside: ContainerRightAside,
});

export default ContainerCompound;
