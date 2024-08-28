import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    active: boolean;
  }
>;

const Tab = <T extends React.ElementType = 'button' | 'a'>({ children, className, leftIcon, rightIcon, active, ...rest }: Props<T>) => {
  const { href, disabled } = rest;
  const Component = href ? 'a' : 'button';

  return (
    <Component
      className={clsx(
        'text-base-main hover:text-base-main group relative inline-flex w-max cursor-pointer flex-nowrap items-center justify-center pb-[12px] after:absolute after:inset-x-0 after:bottom-0 after:z-[1] after:h-[2px] after:w-full after:rounded-full after:transition-colors',
        active && 'text-primary-main after:bg-primary-main',
        disabled && 'text-base-light !cursor-not-allowed after:hidden',
        className,
      )}
      {...rest}
    >
      <Content
        className={clsx(
          'group-hover:bg-secondary-lighter rounded-md px-[8px] py-[2px] transition-colors',
          disabled && 'text-base-light !cursor-not-allowed !bg-transparent',
        )}
        size='m'
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        medium={true}
      >
        {children}
      </Content>
    </Component>
  );
};

export default Tab;
