'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import { InputEvent, InputHTMLAttrs, InputType, SMSizeType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { ReactElement, Ref } from 'react';

type BaseInlineRadioProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value' | 'children'> &
  SMSizeType &
  WithIconsType &
  TextClassNameType;

export interface InlineRadioProps extends BaseInlineRadioProps {
  children?: string;
  value?: string;
  indicator?: boolean;
  rounded?: boolean;
  badge?: ReactElement<BadgeProps>;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const InlineRadio = (props: InlineRadioProps) => {
  const {
    value: externalValue,
    onChange = () => {},
    size = 'm',
    checked = false,
    indicator = true,
    rounded = false,
    badge,
    disabled = false,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    children,
    className,
    textClassName,
    ref: externalRef,
    ...rest
  } = props;

  const value = externalValue ?? children ?? '';

  return (
    <label
      className={clsx(
        'pbc pbc:relative pbc:z-1 pbc:inline-flex pbc:whitespace-nowrap pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:transition-colors pbc:duration-150 pbc:cursor-pointer',
        // цвета взаимоисключающие: в tailwind v4 порядок одинаковых утилит в css не совпадает с порядком в className
        disabled && 'pbc:text-text-secondary',
        !disabled && checked && 'pbc:text-primary-400',
        !disabled && !checked && 'pbc:text-text-primary pbc:hover:text-primary-300',
        checked && indicator ? 'pbc:bg-basic-0' : 'pbc:bg-transparent',
        !checked && !disabled && 'pbc:hover:bg-basic-0/60',
        disabled && 'pbc:cursor-default!',
        // фокус с клавиатуры: сам input скрыт визуально, поэтому обводку показываем на подписи
        'pbc:outline-4 pbc:outline-offset-0 pbc:has-[:focus-visible]:outline-outline-primary',
        size === 's' && 'pbc:px-12 pbc:py-4 pbc:gap-6',
        size === 'm' && 'pbc:px-16 pbc:py-8 pbc:gap-8',
        rounded && 'pbc:rounded-999',
        !rounded && size === 's' && 'pbc:rounded-6',
        !rounded && size === 'm' && 'pbc:rounded-8',
        className,
      )}
    >
      <input
        {...rest}
        ref={externalRef}
        type='radio'
        value={value}
        checked={checked}
        disabled={disabled}
        className='pbc pbc:sr-only'
        onChange={(event) => onChange(event.target.checked, value, event)}
      />
      <Content
        size={size === 's' ? 12 : 16}
        leftIcon={leftIcon}
        leftIconClassName={leftIconClassName}
        rightIcon={rightIcon}
        rightIconClassName={rightIconClassName}
        medium={true}
        className={textClassName}
      >
        {children}
      </Content>
      {badge && <Badge theme='light' color='primary' {...badge.props} size='xs' />}
    </label>
  );
};

InlineRadio.displayName = 'InlineRadio';
export default InlineRadio;
