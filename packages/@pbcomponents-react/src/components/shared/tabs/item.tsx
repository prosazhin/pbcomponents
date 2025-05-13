'use client';

import Content from '@/components/helpers/content';
import { ButtonOrLinkHTMLAttrs, ButtonOrLinkType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { Ref, useRef } from 'react';

type BaseTabProps = ButtonOrLinkHTMLAttrs & WithIconsType & TextClassNameType;
export interface TabProps extends BaseTabProps {
  label?: string;
  active?: boolean;
  ref?: Ref<ButtonOrLinkType>;
}

const Tab = (props: TabProps) => {
  const {
    label,
    active = false,
    disabled = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    className,
    textClassName,
    ref,
    ...rest
  } = props;
  const Component = externalHref ? 'a' : 'button';
  let href = externalHref ? externalHref : undefined;
  if (disabled) href = undefined;

  const internalRef = useRef<ButtonOrLinkType>(null);
  const tabRef = (ref || internalRef) as React.MutableRefObject<ButtonOrLinkType>;

  return (
    <Component
      {...rest}
      ref={tabRef as any}
      className={clsx(
        'pbc pbc:text-basic-main pbc:cursor-pointer pbc:hover:text-basic-main pbc:inline-flex pbc:w-max pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:group pbc:relative pbc:p-0 pbc:pb-12 pbc:bg-transparent',
        'pbc:after:absolute pbc:after:rounded-999 pbc:after:inset-x-0 pbc:after:bottom-0 pbc:after:z-[1] pbc:after:h-2 pbc:after:w-full pbc:after:transition-colors pbc:duration-150',
        active && 'pbc:text-primary-main pbc:after:bg-primary-main',
        disabled && 'pbc:!text-basic-light pbc:after:!hidden',
        className,
      )}
      type={externalHref ? undefined : type}
      href={href}
      target={externalHref ? target : undefined}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <Content
        className={clsx(
          'pbc:group-hover:bg-secondary-lighter pbc:rounded-8 pbc:px-8 pbc:py-2 pbc:transition-colors pbc:duration-150',
          disabled && 'pbc:!text-basic-light pbc:!bg-transparent',
          textClassName,
        )}
        size='m'
        leftIcon={leftIcon}
        leftIconClassName={leftIconClassName}
        rightIcon={rightIcon}
        rightIconClassName={rightIconClassName}
        medium={true}
      >
        {label}
      </Content>
    </Component>
  );
};

Tab.displayName = 'Tab';

export default Tab;
