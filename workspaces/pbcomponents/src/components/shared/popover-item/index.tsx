'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import { PopoverContext } from '@/components/shared/popover/context';
import { ButtonOrLinkHTMLAttrs, LinkComponentType, TextClassNameType, WithIconsType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { ElementType, MouseEvent, ReactElement, useContext } from 'react';

type BasePopoverItemProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> &
  LinkComponentType &
  WithIconsType &
  WrapperClassNameType &
  TextClassNameType;
export interface PopoverItemProps extends BasePopoverItemProps {
  children?: string;
  badge?: ReactElement<BadgeProps>;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const PopoverItem = (props: PopoverItemProps) => {
  const {
    disabled = false,
    borderTop = false,
    borderBottom = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    linkComponent,
    badge,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    wrapperClassName,
    textClassName,
    onClick,
    ...rest
  } = props;

  // внутри Popover пункт закрывает попап после клика
  const popover = useContext(PopoverContext);

  let href = externalHref ? externalHref : undefined;

  if (disabled) {
    href = undefined;
  }

  // у задизейбленной ссылки href снят, а кастомный link-компонент (например NextLink)
  // без href падает — поэтому в этом случае рендерим обычный <a>
  let Component: ElementType = 'button';

  if (href && linkComponent) {
    Component = linkComponent;
  } else if (externalHref) {
    Component = 'a';
  }

  return (
    <div className={clsx('pbc pbc:flex pbc:w-full pbc:flex-col', wrapperClassName)}>
      {borderTop && (
        <div className='pbc pbc:w-full pbc:py-8'>
          <div className='pbc pbc:h-1 pbc:w-full pbc:bg-secondary-200' />
        </div>
      )}
      <Component
        {...rest}
        className={clsx(
          'pbc pbc:w-full pbc:flex pbc:flex-row pbc:items-center pbc:gap-8 pbc:px-20 pbc:py-12 pbc:cursor-pointer pbc:transition-colors pbc:duration-150 pbc:rounded-12 pbc:max-h-48',
          'pbc:bg-transparent pbc:text-text-primary pbc:hover:bg-secondary-100 pbc:focus-visible:bg-secondary-100 pbc:outline-none',
          disabled && 'pbc:cursor-default! pbc:text-text-secondary! pbc:bg-transparent!',
          className,
        )}
        type={externalHref ? undefined : type}
        href={href}
        target={externalHref ? target : undefined}
        disabled={disabled}
        aria-disabled={disabled}
        onClick={(event: MouseEvent<HTMLElement>) => {
          // у задизейбленной ссылки нет атрибута disabled, поэтому клик глушим сами
          if (disabled) return;
          onClick?.(event);
          popover?.close();
        }}
      >
        <Content
          size={16}
          leftIcon={leftIcon}
          leftIconClassName={leftIconClassName}
          rightIcon={rightIcon}
          rightIconClassName={rightIconClassName}
          className={clsx('pbc:w-full pbc:text-left', textClassName)}
        >
          {children}
        </Content>
        {badge && <Badge theme='filled' color='secondary' {...badge.props} size='xs' />}
      </Component>
      {borderBottom && (
        <div className='pbc pbc:w-full pbc:py-8'>
          <div className='pbc pbc:h-1 pbc:w-full pbc:bg-secondary-200' />
        </div>
      )}
    </div>
  );
};

PopoverItem.displayName = 'PopoverItem';
export default PopoverItem;
