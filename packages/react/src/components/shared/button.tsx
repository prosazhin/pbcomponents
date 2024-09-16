import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';

export type Props<T extends React.ElementType = 'button' | 'a'> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    size: 'xs' | 's' | 'm' | 'l';
    theme: 'filled' | 'light' | 'border' | 'ghost';
    color: 'primary' | 'secondary' | 'success' | 'danger';
    loading?: boolean | never;
    disabled?: boolean | never;
  }
>;

const Button = <T extends React.ElementType = 'button' | 'a'>({
  children,
  className,
  leftIcon,
  rightIcon,
  size,
  theme,
  color,
  loading,
  ...rest
}: Props<T>) => {
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const { href, disabled } = rest;
  const Component = href ? 'a' : 'button';

  useEffect(() => {
    if (ref && ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [children, size, leftIcon, rightIcon]);

  return (
    <Component
      className={clsx(
        'pbc pbc-flex-inline pbc-transition-colors',
        size === 'xs' && 'pbc-py-4 pbc-px-8 pbc-rounded-6 pbc-h-26',
        size === 's' && 'pbc-py-8 pbc-px-12 pbc-rounded-8 pbc-h-[34px]',
        size === 'm' && 'pbc-py-12 pbc-px-16 pbc-rounded-12 pbc-h-48',
        size === 'l' && 'pbc-py-16 pbc-px-20 pbc-rounded-16 pbc-h-[62px]',
        theme === 'filled' && 'pbc-text-white',
        theme === 'filled' && color === 'primary' && 'pbc-bg-primary-main hover:pbc-bg-primary-darker',
        theme === 'filled' && color === 'secondary' && 'pbc-bg-secondary-main hover:pbc-bg-secondary-darker',
        theme === 'filled' && color === 'success' && 'pbc-bg-success-main hover:pbc-bg-success-darker',
        theme === 'filled' && color === 'danger' && 'pbc-bg-danger-main hover:pbc-bg-danger-darker',
        theme === 'filled' && disabled && !loading && '!pbc-bg-secondary-lighter !pbc-text-basic-light',
        theme !== 'filled' && color === 'primary' && 'pbc-text-primary-darker',
        theme !== 'filled' && color === 'secondary' && 'pbc-text-basic-main',
        theme !== 'filled' && color === 'success' && 'pbc-text-success-darker',
        theme !== 'filled' && color === 'danger' && 'pbc-text-danger-darker',
        theme === 'light' && color === 'primary' && 'pbc-bg-primary-lighter hover:pbc-bg-primary-light',
        theme === 'light' && color === 'secondary' && 'pbc-bg-secondary-lighter hover:pbc-bg-secondary-light',
        theme === 'light' && color === 'success' && 'pbc-bg-success-lighter hover:pbc-bg-success-light',
        theme === 'light' && color === 'danger' && 'pbc-bg-danger-lighter hover:pbc-bg-danger-light',
        theme === 'light' && disabled && !loading && '!pbc-bg-secondary-lighter !pbc-text-basic-light',
        theme === 'border' && 'pbc-border-1 hover:pbc-border-transparent',
        theme === 'border' && color === 'primary' && 'pbc-border-primary-light hover:pbc-bg-primary-lighter',
        theme === 'border' && color === 'secondary' && 'pbc-border-secondary-light hover:pbc-bg-secondary-lighter',
        theme === 'border' && color === 'success' && 'pbc-border-success-light hover:pbc-bg-success-lighter',
        theme === 'border' && color === 'danger' && 'pbc-border-danger-light hover:pbc-bg-danger-lighter',
        theme === 'border' && disabled && !loading && '!pbc-border-secondary-lighter !pbc-text-basic-light',
        theme === 'ghost' && color === 'primary' && 'hover:pbc-bg-primary-lighter',
        theme === 'ghost' && color === 'secondary' && 'hover:pbc-bg-secondary-lighter',
        theme === 'ghost' && color === 'success' && 'hover:pbc-bg-success-lighter',
        theme === 'ghost' && color === 'danger' && 'hover:pbc-bg-danger-lighter',
        color === 'primary' && 'pbc-outline-primary',
        color === 'secondary' && 'pbc-outline-secondary',
        color === 'success' && 'pbc-outline-success',
        color === 'danger' && 'pbc-outline-danger',
        theme === 'ghost' && disabled && !loading && '!pbc-text-basic-light',
        (theme === 'border' || theme === 'ghost') && 'pbc-bg-transparent',
        loading && 'pbc-cursor-default',
        className,
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      ref={ref}
      style={{ width: loading ? width : undefined }}
      {...rest}
    >
      {loading ? (
        <Icon tag={ArrowPathIcon} size={size === 'xs' ? 's' : size} className={clsx('pbc-animate-spin pbc-transition')} />
      ) : (
        <Content size={size === 'xs' ? 's' : size} leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
          {children}
        </Content>
      )}
    </Component>
  );
};

export default Button;
