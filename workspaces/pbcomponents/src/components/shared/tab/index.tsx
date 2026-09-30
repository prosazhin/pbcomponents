'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import { ButtonOrLinkHTMLAttrs, ButtonOrLinkType, LinkComponentType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { ElementType, ReactElement, Ref, useRef } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

export type TabTheme = 'line' | 'pill' | 'pill-secondary';

type BaseTabProps = ButtonOrLinkHTMLAttrs & LinkComponentType & WithIconsType & TextClassNameType;
export interface TabProps extends BaseTabProps {
  label?: string;
  active?: boolean;
  indicator?: boolean;
  theme?: TabTheme;
  badge?: ReactElement<BadgeProps>;
  ref?: Ref<ButtonOrLinkType>;
}

// вид бейджа зависит от темы и активности таба — как в фигме
const getBadgeProps = (theme: TabTheme, active: boolean): Pick<BadgeProps, 'theme' | 'color'> => {
  if (active && theme === 'pill') return { theme: 'light', color: 'primary' };
  if (active && theme === 'pill-secondary') return { theme: 'light', color: 'secondary' };

  return { theme: 'filled', color: 'secondary' };
};

const Tab = (props: TabProps) => {
  const {
    label,
    active = false,
    indicator = true,
    theme = 'line',
    badge,
    disabled = false,
    type = 'button',
    target = '_self',
    href: externalHref,
    linkComponent,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    className,
    textClassName,
    onClick,
    ref: externalRef,
    ...rest
  } = props;

  const internalRef = useRef<ButtonOrLinkType>(null);
  const ref = useMergeRefs(internalRef, externalRef);

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

  const isPill = theme === 'pill' || theme === 'pill-secondary';

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc:cursor-pointer pbc:inline-flex pbc:w-max pbc:shrink-0 pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:group pbc:relative pbc:p-0 pbc:border-0 pbc:transition-colors pbc:duration-150',
        // обводка при фокусе с клавиатуры (между табами ходят стрелками)
        'pbc:outline-4 pbc:outline-offset-0 pbc:focus-visible:outline-outline-primary',
        theme === 'line' && [
          'pbc:pb-8 pbc:bg-transparent',
          active && !disabled ? 'pbc:text-primary-400 pbc:hover:text-text-primary' : 'pbc:text-text-primary',
          indicator && 'pbc:after:absolute pbc:after:rounded-999 pbc:after:inset-x-0 pbc:after:bottom-0 pbc:after:z-1 pbc:after:h-2',
          indicator && active && 'pbc:after:bg-primary-300',
        ],
        isPill && 'pbc:rounded-999 pbc:gap-8 pbc:px-16 pbc:py-8',
        theme === 'pill' && [
          !active && 'pbc:bg-transparent pbc:text-text-primary pbc:hover:bg-primary-100',
          active && (indicator ? 'pbc:bg-primary-300 pbc:hover:bg-primary-400' : 'pbc:bg-transparent'),
          active && 'pbc:text-text-contrast',
        ],
        theme === 'pill-secondary' && [
          !active && 'pbc:bg-transparent pbc:text-text-primary pbc:hover:bg-secondary-100',
          active && (indicator ? 'pbc:bg-secondary-300 pbc:hover:bg-secondary-400' : 'pbc:bg-transparent'),
          active && 'pbc:text-text-contrast',
        ],
        disabled && 'pbc:cursor-default! pbc:text-text-secondary! pbc:bg-transparent!',
        className,
      )}
      type={externalHref ? undefined : type}
      href={href}
      target={externalHref ? target : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      // у задизейбленной ссылки нет атрибута disabled, поэтому клик глушим сами
      onClick={disabled ? undefined : onClick}
    >
      <span
        className={clsx(
          'pbc pbc:inline-flex pbc:items-center pbc:gap-8',
          theme === 'line' && 'pbc:rounded-8 pbc:px-8 pbc:py-4 pbc:transition-colors pbc:duration-150',
          theme === 'line' && !disabled && 'pbc:group-hover:bg-secondary-100',
        )}
      >
        <Content
          className={textClassName}
          size={16}
          leftIcon={leftIcon}
          leftIconClassName={leftIconClassName}
          rightIcon={rightIcon}
          rightIconClassName={rightIconClassName}
          medium={true}
        >
          {label}
        </Content>
        {badge && <Badge {...getBadgeProps(theme, active && !disabled)} {...badge.props} size='xs' />}
      </span>
    </Component>
  );
};

Tab.displayName = 'Tab';
export default Tab;
