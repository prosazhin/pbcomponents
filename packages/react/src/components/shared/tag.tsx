import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';

const sizes = {
  s: 'py-[4px] px-[8px]',
  m: 'py-[8px] px-[12px]',
};

const themes = {
  light: {
    default: 'bg-primary-lighter text-base-main hover:bg-primary-light',
    checked: 'bg-primary-main text-white hover:bg-primary-darker',
    disabled: 'bg-secondary-lighter text-base-light',
  },
  border: {
    default: 'before:border-secondary-light text-base-main hover:before:border-primary-main',
    checked: 'bg-primary-main text-white hover:bg-primary-darker',
    disabled: 'before:border-secondary-lighter text-base-light',
  },
};

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    checked: boolean;
    size: 's' | 'm';
    theme: 'light' | 'border';
    loading?: boolean;
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
        'relative inline-flex w-max cursor-pointer flex-nowrap items-center justify-center rounded-full transition-colors before:absolute before:size-full before:rounded-full before:transition-colors',
        sizes[size],
        !checked && theme === 'border' && 'before:border',
        checked
          ? disabled && !loading
            ? `${themes.light.disabled} !cursor-not-allowed`
            : themes[theme].checked
          : disabled && !loading
            ? `${themes[theme].disabled} !cursor-not-allowed`
            : themes[theme].default,
        className,
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      ref={ref}
      style={{ width: loading ? width : undefined }}
      {...rest}
    >
      {loading ? (
        <Icon name={ArrowPathIcon} size='s' className='animate-spin transition' />
      ) : (
        <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
          {children}
        </Content>
      )}
    </Component>
  );
};

export default Tag;
