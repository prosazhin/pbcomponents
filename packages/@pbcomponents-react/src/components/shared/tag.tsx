'use client';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';
import { ButtonOrLinkHTMLAttrs, ButtonOrLinkType, LoadingType, SMSizeType, TextClassNameType, WithIconsType } from '@/types';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Ref, useEffect, useRef, useState } from 'react';

type BaseTagProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> & LoadingType & SMSizeType & WithIconsType & TextClassNameType;
export interface TagProps extends BaseTagProps {
  children?: string;
  checked?: boolean;
  theme?: 'light' | 'border';
  ref?: Ref<ButtonOrLinkType>;
}

const Tag = (props: TagProps) => {
  const {
    size = 'm',
    theme = 'light',
    checked = false,
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
  const tagRef = (ref || internalRef) as React.MutableRefObject<ButtonOrLinkType>;

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (tagRef.current) {
      setWidth(tagRef.current.offsetWidth);
    }
  }, [tagRef, children, size, leftIcon, rightIcon]);

  return (
    <Component
      {...rest}
      ref={tagRef as any}
      className={clsx(
        'pbc pbc:rounded-999 pbc:inline-flex pbc:w-max pbc:flex-nowrap pbc:cursor-pointer pbc:items-center pbc:justify-center pbc:transition-colors pbc:duration-150 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:border-1 pbc:border-transparent',
        size === 's' && 'pbc:h-26 pbc:px-8 pbc:py-4',
        size === 'm' && 'pbc:h-[34px] pbc:px-12 pbc:py-8',
        theme === 'light' && !checked && 'pbc:bg-primary-lighter pbc:text-basic-main pbc:hover:bg-primary-light',
        theme === 'border' &&
          !checked &&
          'pbc:!border-secondary-light pbc:text-basic-main pbc:hover:!border-primary-main pbc:bg-transparent',
        checked && 'pbc:bg-primary-main pbc:hover:bg-primary-darker pbc:text-white',
        (theme === 'light' || checked) && disabled && !loading && 'pbc:!bg-secondary-lighter pbc:!text-basic-light',
        theme === 'border' &&
          disabled &&
          !loading &&
          'pbc:!border-secondary-lighter pbc:hover:!border-secondary-lighter pbc:!text-basic-light',
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
        <Icon tag={ArrowPathIcon} size='s' className={clsx('pbc:animate-spin pbc:transition')} />
      ) : (
        <Content
          size='s'
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

Tag.displayName = 'Tag';

export default Tag;
