'use client';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';
import {
  ButtonOrLinkHTMLAttrs,
  ButtonOrLinkType,
  LinkComponentType,
  LoadingType,
  SMSizeType,
  TextClassNameType,
  WithIconsType,
} from '@/types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ElementType, Ref, useEffect, useRef, useState } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

type BaseTagProps = Omit<ButtonOrLinkHTMLAttrs, 'children'> &
  LoadingType &
  SMSizeType &
  LinkComponentType &
  WithIconsType &
  TextClassNameType;
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
    linkComponent,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    textClassName,
    onClick,
    ref: externalRef,
    ...rest
  } = props;

  const internalRef = useRef<ButtonOrLinkType>(null);
  const ref = useMergeRefs(internalRef, externalRef);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (internalRef.current) {
      setWidth(internalRef.current.offsetWidth);
    }
  }, [internalRef, children, size, leftIcon, rightIcon]);

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
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc:rounded-999 pbc:inline-flex pbc:w-max pbc:flex-nowrap pbc:cursor-pointer pbc:items-center pbc:justify-center pbc:transition pbc:duration-150 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:inset-ring pbc:inset-ring-transparent',
        size === 's' && 'pbc:h-26 pbc:px-8 pbc:py-4',
        size === 'm' && 'pbc:h-34 pbc:px-12 pbc:py-8',
        theme === 'light' && !checked && 'pbc:bg-primary-100 pbc:text-text-primary pbc:hover:bg-primary-200',
        theme === 'border' &&
          !checked &&
          'pbc:inset-ring-primary-200! pbc:text-text-primary pbc:hover:inset-ring-primary-300! pbc:bg-basic-0',
        checked && 'pbc:bg-primary-300 pbc:hover:bg-primary-400 pbc:text-text-contrast',
        (theme === 'light' || checked) && disabled && !loading && 'pbc:bg-secondary-100! pbc:text-text-secondary!',
        theme === 'border' &&
          !checked &&
          disabled &&
          !loading &&
          'pbc:inset-ring-secondary-200! pbc:hover:inset-ring-secondary-200! pbc:text-text-secondary!',
        (disabled || loading) && 'pbc:cursor-default!',
        className,
      )}
      type={externalHref ? undefined : type}
      href={href}
      target={externalHref ? target : undefined}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      // у задизейбленной ссылки нет атрибута disabled, поэтому клик глушим сами
      onClick={disabled || loading ? undefined : onClick}
      style={{ width: loading ? width : undefined }}
    >
      {loading ? (
        <Icon tag={ArrowPathIcon} size={14} className={clsx('pbc:animate-spin pbc:transition')} />
      ) : (
        <Content
          size={12}
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
