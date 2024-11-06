'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import { ButtonOrLinkHTMLAttrs, TextClassNameType, WithIconsType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';

type BaseDropdownItemProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> & WithIconsType & WrapperClassNameType & TextClassNameType;

export interface DropdownItemProps extends BaseDropdownItemProps {
  children?: string;
  badge?: React.ReactElement<BadgeProps>;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const DropdownItem = (props: DropdownItemProps) => {
  const {
    disabled = false,
    borderTop = false,
    borderBottom = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    badge,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    wrapperClassName,
    textClassName,
    ...rest
  } = props;
  const Component = externalHref ? 'a' : 'button';
  let href = externalHref ? externalHref : undefined;
  if (disabled) href = undefined;

  return (
    <div
      className={clsx(
        'pbc-border-1 pbc-border-solid pbc-border-transparent pbc-flex pbc-flex-col',
        borderTop && 'pbc-border-t-secondary-lighter pbc-mt-8 pbc-pt-8',
        borderBottom && 'pbc-border-b-secondary-lighter pbc-mb-8 pbc-pb-8',
        wrapperClassName,
      )}
    >
      <Component
        {...rest}
        className={clsx(
          'pbc pbc-w-full pbc-flex pbc-flex-row pbc-items-center pbc-gap-8 pbc-px-20 pbc-py-12 pbc-cursor-pointer pbc-transition-colors pbc-rounded-12 pbc-max-h-48',
          'pbc-bg-transparent pbc-text-basic-main hover:pbc-bg-secondary-lighter',
          disabled && '!pbc-cursor-default !pbc-text-basic-light !pbc-bg-transparent',
          className,
        )}
        type={externalHref ? undefined : type}
        href={href}
        target={externalHref ? target : undefined}
        disabled={disabled}
        aria-disabled={disabled}
      >
        <Content
          size='m'
          leftIcon={leftIcon}
          leftIconClassName={leftIconClassName}
          rightIcon={rightIcon}
          rightIconClassName={rightIconClassName}
          className={clsx('pbc-w-full pbc-items-start pbc-text-left', textClassName)}
        >
          {children}
        </Content>
        {badge && <Badge {...badge.props} size='s' />}
      </Component>
    </div>
  );
};

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
