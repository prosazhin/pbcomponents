'use client';

import Content from '@/components/helpers/content';
import { ButtonOrLinkHTMLAttrs, ButtonOrLinkType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useRef } from 'react';

type BaseTabProps = ButtonOrLinkHTMLAttrs & WithIconsType & TextClassNameType;

export interface TabProps extends BaseTabProps {
  label?: string;
  active?: boolean;
}

const Tab = forwardRef<ButtonOrLinkType, TabProps>((props, ref) => {
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
        'pbc pbc-text-basic-main hover:pbc-text-basic-main pbc-inline-flex pbc-w-max pbc-flex-nowrap pbc-items-center pbc-justify-center pbc-group pbc-relative pbc-p-0 pbc-pb-12 pbc-bg-transparent',
        'after:pbc-absolute after:pbc-rounded-999 after:pbc-inset-x-0 after:pbc-bottom-0 after:pbc-z-[1] after:pbc-h-2 after:pbc-w-full after:pbc-transition-colors',
        active && 'pbc-text-primary-main after:pbc-bg-primary-main',
        disabled && '!pbc-text-basic-light after:!pbc-hidden',
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
          'group-hover:pbc-bg-secondary-lighter pbc-rounded-8 pbc-px-8 pbc-py-2 pbc-transition-colors',
          disabled && '!pbc-text-basic-light !pbc-bg-transparent',
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
});

Tab.displayName = 'Tab';

export default Tab;
