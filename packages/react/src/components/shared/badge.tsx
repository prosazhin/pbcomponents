'use client';

import Content from '@/components/helpers/content';
import { ColorType, SMSizeType, SpanHTMLAttrs, SpanType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseBadgeProps = SpanHTMLAttrs & WithIconsType & SMSizeType & ColorType & TextClassNameType;

export interface BadgeProps extends BaseBadgeProps {
  theme?: 'filled' | 'light' | 'border';
}

const Badge = forwardRef<SpanType, BadgeProps>((props, ref) => {
  const {
    size = 'm',
    theme = 'filled',
    color = 'primary',
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    textClassName,
    ...rest
  } = props;

  return (
    <span
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc-rounded-999 pbc-inline-flex pbc-w-max pbc-flex-nowrap pbc-items-center pbc-justify-center !pbc-cursor-default',
        size === 's' && 'pbc-py-4 pbc-px-8 pbc-h-26',
        size === 'm' && 'pbc-py-8 pbc-px-12 pbc-h-[34px]',
        theme === 'filled' && 'pbc-text-white',
        theme === 'filled' && color === 'primary' && 'pbc-bg-primary-main',
        theme === 'filled' && color === 'secondary' && 'pbc-bg-secondary-main',
        theme === 'filled' && color === 'success' && 'pbc-bg-success-main',
        theme === 'filled' && color === 'danger' && 'pbc-bg-danger-main',
        theme !== 'filled' && color === 'primary' && 'pbc-text-primary-darker',
        theme !== 'filled' && color === 'secondary' && 'pbc-text-basic-main',
        theme !== 'filled' && color === 'success' && 'pbc-text-success-darker',
        theme !== 'filled' && color === 'danger' && 'pbc-text-danger-darker',
        theme === 'light' && color === 'primary' && 'pbc-bg-primary-lighter',
        theme === 'light' && color === 'secondary' && 'pbc-bg-secondary-lighter',
        theme === 'light' && color === 'success' && 'pbc-bg-success-lighter',
        theme === 'light' && color === 'danger' && 'pbc-bg-danger-lighter',
        theme === 'border' && 'pbc-border-1',
        theme === 'border' && color === 'primary' && 'pbc-border-primary-main',
        theme === 'border' && color === 'secondary' && 'pbc-border-secondary-main',
        theme === 'border' && color === 'success' && 'pbc-border-success-main',
        theme === 'border' && color === 'danger' && 'pbc-border-danger-main',
        className,
      )}
    >
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
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
