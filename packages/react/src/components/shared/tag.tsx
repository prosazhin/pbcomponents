import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    checked: boolean;
    size: 's' | 'm';
    theme: 'light' | 'border';
    loading?: boolean | never;
    disabled?: boolean | never;
  }
>;

const Tag = <T extends React.ElementType = 'button' | 'a'>({
  children,
  className,
  leftIcon,
  rightIcon,
  checked,
  size,
  theme,
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
        'pbc pbc-rounded-999 pbc-flex-inline pbc-transition-colors pbc-outline-primary pbc-border-1',
        size === 's' && 'pbc-h-26 pbc-px-8 pbc-py-4',
        size === 'm' && 'pbc-h-[34px] pbc-px-12 pbc-py-8',
        theme === 'light' && !checked && 'pbc-bg-primary-lighter pbc-text-basic-main hover:pbc-bg-primary-light',
        theme === 'border' && !checked && 'pbc-border-secondary-light pbc-text-basic-main hover:pbc-border-primary-main pbc-bg-transparent',
        checked && 'pbc-bg-primary-main hover:pbc-bg-primary-darker pbc-text-white',
        (theme === 'light' || checked) && disabled && !loading && 'pbc-bg-secondary-lighter pbc-text-basic-light',
        theme === 'border' && disabled && !loading && 'pbc-border-secondary-lighter pbc-text-basic-light',
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
        <Icon tag={ArrowPathIcon} size='s' className={clsx('pbc-animate-spin pbc-transition')} />
      ) : (
        <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
          {children}
        </Content>
      )}
    </Component>
  );
};

export default Tag;
