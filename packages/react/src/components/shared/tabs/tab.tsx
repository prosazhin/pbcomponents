'use client';

import Content from '@/components/helpers/content';
import { ButtonOrLinkHTMLAttributes, ButtonOrLinkType, DisabledType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useRef } from 'react';

type BaseTabProps = ButtonOrLinkHTMLAttributes & DisabledType & WithIconsType;

export interface TabProps extends BaseTabProps {
  label?: string;
  active?: boolean;
}

const Tab = forwardRef<ButtonOrLinkType, TabProps>((props, ref) => {
  const { label, className, active = false, disabled = false, leftIcon, rightIcon, ...rest } = props;
  const { href } = rest;
  const TagName = href ? 'a' : 'button';

  const internalRef = useRef<ButtonOrLinkType>(null);
  const tabRef = (ref || internalRef) as React.MutableRefObject<ButtonOrLinkType>;

  return (
    <TagName
      {...rest}
      ref={tabRef as any}
      className={clsx(
        'pbc pbc-text-basic-main hover:pbc-text-basic-main pbc-flex-inline pbc-group pbc-relative pbc-p-0 pbc-pb-12 pbc-bg-transparent',
        'after:pbc-absolute after:pbc-rounded-999 after:pbc-inset-x-0 after:pbc-bottom-0 after:pbc-z-[1] after:pbc-h-2 after:pbc-w-full after:pbc-transition-colors',
        active && 'pbc-text-primary-main after:pbc-bg-primary-main',
        disabled && '!pbc-text-basic-light after:!pbc-hidden',
        className,
      )}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <Content
        className={clsx(
          'group-hover:pbc-bg-secondary-lighter pbc-rounded-8 pbc-px-8 pbc-py-2 pbc-transition-colors',
          disabled && '!pbc-text-basic-light !pbc-bg-transparent',
        )}
        size='m'
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        medium={true}
      >
        {label}
      </Content>
    </TagName>
  );
});

Tab.displayName = 'Tab';

export default Tab;
