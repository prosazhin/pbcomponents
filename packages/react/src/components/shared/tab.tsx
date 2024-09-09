import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    active: boolean;
    disabled?: boolean | never;
  }
>;

const Tab = <T extends React.ElementType = 'button' | 'a'>({ children, className, leftIcon, rightIcon, active, ...rest }: Props<T>) => {
  const { href, disabled } = rest;
  const Component = href ? 'a' : 'button';

  return (
    <Component
      className={clsx(
        'pbc pbc-text-basic-main hover:pbc-text-basic-main pbc-flex-inline pbc-group pbc-relative pbc-p-0 pbc-pb-12 pbc-bg-transparent',
        'after:pbc-absolute after:pbc-rounded-999 after:pbc-inset-x-0 after:pbc-bottom-0 after:pbc-z-[1] after:pbc-h-2 after:pbc-w-full after:pbc-transition-colors',
        active && 'pbc-text-primary-main after:pbc-bg-primary-main',
        disabled && 'pbc-text-basic-light after:pbc-hidden',
        className,
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      <Content
        className={clsx(
          'group-hover:pbc-bg-secondary-lighter pbc-rounded-8 pbc-px-8 pbc-py-2 pbc-transition-colors',
          disabled && 'pbc-text-basic-light !pbc-bg-transparent',
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
