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
import { forwardRef, useEffect, useRef, useState } from 'react';

type BaseButtonProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> &
  LoadingType &
  ColorType &
  SizeType &
  ThemeType &
  WithIconsType &
  TextClassNameType;

export interface ButtonProps extends BaseButtonProps {
  children?: string;
}

const Button = forwardRef<ButtonOrLinkType, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    textClassName,
    size = 'm',
    theme = 'filled',
    color = 'primary',
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    ...rest
  } = props;
  const { href } = rest;
  const TagName = href ? 'a' : 'button';

  const internalRef = useRef<ButtonOrLinkType>(null);
  const buttonRef = (ref || internalRef) as React.MutableRefObject<ButtonOrLinkType>;

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, [buttonRef, children, size, leftIcon, rightIcon]);

  return (
    <TagName
      {...rest}
      ref={buttonRef as any}
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max xs:pbc-w-full pbc-flex-nowrap pbc-items-center pbc-justify-center pbc-transition-colors',
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
        theme === 'border' && 'pbc-border-1 pbc-border-solid hover:pbc-border-transparent',
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
      style={{ width: loading ? width : undefined }}
    >
      {loading ? (
        <Icon tag={ArrowPathIcon} size={size === 'xs' ? 's' : size} className={clsx('pbc-animate-spin pbc-transition')} />
      ) : (
        <Content size={size === 'xs' ? 's' : size} leftIcon={leftIcon} rightIcon={rightIcon} medium={true} className={textClassName}>
          {children}
        </Content>
      )}
    </TagName>
  );
});

Button.displayName = 'Button';

export default Button;
