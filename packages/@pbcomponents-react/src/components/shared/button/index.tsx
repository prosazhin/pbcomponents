'use client';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';
import {
  ButtonOrLinkHTMLAttrs,
  ButtonOrLinkType,
  ColorType,
  LoadingType,
  SizeType,
  TextClassNameType,
  ThemeType,
  WithIconsType,
} from '@/types';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Ref, useEffect, useRef, useState } from 'react';

type BaseButtonProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> &
  LoadingType &
  ColorType &
  SizeType &
  ThemeType &
  WithIconsType &
  TextClassNameType;

export interface ButtonProps extends BaseButtonProps {
  children?: string;
  ref?: Ref<ButtonOrLinkType>;
}

const Button = (props: ButtonProps) => {
  const {
    size = 'm',
    theme = 'filled',
    color = 'primary',
    loading = false,
    disabled = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    textClassName,
    ref,
    ...rest
  } = props;
  const Component = externalHref ? 'a' : 'button';
  let href = externalHref ? externalHref : undefined;
  if (disabled) href = undefined;

  const internalRef = useRef<ButtonOrLinkType>(null);
  const buttonRef = (ref || internalRef) as React.MutableRefObject<ButtonOrLinkType>;

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, [buttonRef, children, size, leftIcon, rightIcon]);

  return (
    <Component
      {...rest}
      ref={buttonRef as any}
      className={clsx(
        'pbc pbc:inline-flex pbc:w-max pbc:max-xs:w-full pbc:flex-nowrap pbc:items-center pbc:cursor-pointer pbc:justify-center pbc:transition-colors pbc:duration-150',
        size === 'xs' && 'pbc:py-4 pbc:px-8 pbc:rounded-6 pbc:h-26',
        size === 's' && 'pbc:py-8 pbc:px-12 pbc:rounded-8 pbc:h-34',
        size === 'm' && 'pbc:py-12 pbc:px-16 pbc:rounded-12 pbc:h-48',
        size === 'l' && 'pbc:py-16 pbc:px-20 pbc:rounded-16 pbc:h-62',
        theme === 'filled' && 'pbc:text-white',
        theme === 'filled' && color === 'primary' && 'pbc:bg-primary-main pbc:hover:bg-primary-darker',
        theme === 'filled' && color === 'secondary' && 'pbc:bg-secondary-main pbc:hover:bg-secondary-darker',
        theme === 'filled' && color === 'success' && 'pbc:bg-success-main pbc:hover:bg-success-darker',
        theme === 'filled' && color === 'danger' && 'pbc:bg-danger-main pbc:hover:bg-danger-darker',
        theme === 'filled' && disabled && !loading && 'pbc:!bg-secondary-lighter pbc:!text-basic-light',
        theme !== 'filled' && color === 'primary' && 'pbc:text-primary-darker',
        theme !== 'filled' && color === 'secondary' && 'pbc:text-basic-main',
        theme !== 'filled' && color === 'success' && 'pbc:text-success-darker',
        theme !== 'filled' && color === 'danger' && 'pbc:text-danger-darker',
        theme === 'light' && color === 'primary' && 'pbc:bg-primary-lighter pbc:hover:bg-primary-light',
        theme === 'light' && color === 'secondary' && 'pbc:bg-secondary-lighter pbc:hover:bg-secondary-light',
        theme === 'light' && color === 'success' && 'pbc:bg-success-lighter pbc:hover:bg-success-light',
        theme === 'light' && color === 'danger' && 'pbc:bg-danger-lighter pbc:hover:bg-danger-light',
        theme === 'light' && disabled && !loading && 'pbc:!bg-secondary-lighter pbc:!text-basic-light',
        theme === 'border' && 'pbc:border-1 pbc:border-solid pbc:hover:border-transparent',
        theme === 'border' && color === 'primary' && 'pbc:border-primary-light pbc:hover:bg-primary-lighter',
        theme === 'border' && color === 'secondary' && 'pbc:border-secondary-light pbc:hover:bg-secondary-lighter',
        theme === 'border' && color === 'success' && 'pbc:border-success-light pbc:hover:bg-success-lighter',
        theme === 'border' && color === 'danger' && 'pbc:border-danger-light pbc:hover:bg-danger-lighter',
        theme === 'border' && disabled && !loading && 'pbc:!border-secondary-lighter pbc:!text-basic-light',
        theme === 'ghost' && color === 'primary' && 'pbc:hover:bg-primary-lighter',
        theme === 'ghost' && color === 'secondary' && 'pbc:hover:bg-secondary-lighter',
        theme === 'ghost' && color === 'success' && 'pbc:hover:bg-success-lighter',
        theme === 'ghost' && color === 'danger' && 'pbc:hover:bg-danger-lighter',
        color === 'primary' && 'pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0',
        color === 'secondary' && 'pbc:focus:outline-outline-secondary pbc:outline-4 pbc:outline-offset-0',
        color === 'success' && 'pbc:focus:outline-outline-success pbc:outline-4 pbc:outline-offset-0',
        color === 'danger' && 'pbc:focus:outline-outline-danger pbc:outline-4 pbc:outline-offset-0',
        theme === 'ghost' && disabled && !loading && 'pbc:!text-basic-light',
        (theme === 'border' || theme === 'ghost') && 'pbc:bg-transparent',
        (disabled || loading) && 'pbc:!cursor-default',
        className,
      )}
      type={externalHref ? undefined : type}
      href={href}
      target={externalHref ? target : undefined}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      style={{ width: loading ? width : undefined }}
    >
      {loading ? (
        <Icon tag={ArrowPathIcon} size={size === 'xs' ? 's' : size} className={clsx('pbc:animate-spin pbc:transition')} />
      ) : (
        <Content
          size={size === 'xs' ? 's' : size}
          leftIcon={leftIcon}
          leftIconClassName={leftIconClassName}
          rightIcon={rightIcon}
          rightIconClassName={rightIconClassName}
          medium={true}
          className={textClassName}
        >
          {children}
        </Content>
      )}
    </Component>
  );
};

Button.displayName = 'Button';

export default Button;
