'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactElement, isValidElement } from 'react';

export interface SelectOptionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: string;
  selected?: boolean;
  badge?: BadgeProps | ReactElement<BadgeProps>;
}

// пункт списка в Select и Search (.select_item в фигме)
const SelectOption = (props: SelectOptionProps) => {
  const { children, selected = false, disabled = false, badge, className, ...rest } = props;

  return (
    <button
      {...rest}
      type='button'
      role='option'
      aria-selected={selected}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        'pbc pbc:w-full pbc:flex pbc:flex-row pbc:items-center pbc:gap-8 pbc:px-20 pbc:py-12 pbc:cursor-pointer pbc:transition-colors pbc:duration-150 pbc:rounded-12 pbc:max-h-48',
        'pbc:bg-transparent pbc:text-text-primary pbc:hover:bg-secondary-100 pbc:focus-visible:bg-secondary-100 pbc:outline-none',
        disabled && 'pbc:cursor-default! pbc:text-text-secondary! pbc:bg-transparent!',
        className,
      )}
    >
      <Content
        size={16}
        className='pbc:w-full pbc:text-left'
        leftIcon={CheckIcon}
        leftIconClassName={clsx('pbc:text-primary-400', !selected && 'pbc:invisible', disabled && 'pbc:text-text-secondary!')}
      >
        {children}
      </Content>
      {badge && <Badge theme='filled' color='secondary' {...(isValidElement<BadgeProps>(badge) ? badge.props : badge)} size='xs' />}
    </button>
  );
};

SelectOption.displayName = 'SelectOption';
export default SelectOption;
