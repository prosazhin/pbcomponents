'use client';

import Content from '@/components/helpers/content';
import { ChildrenType, InputEvent, InputHTMLAttrs, InputType, SMSizeType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

type BaseInlineRadioProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value' | 'children'> &
  ChildrenType &
  SMSizeType &
  WithIconsType &
  TextClassNameType;

export interface InlineRadioProps extends BaseInlineRadioProps {
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
}

const InlineRadio = forwardRef<InputType, InlineRadioProps>((props, ref) => {
  const {
    children,
    className,
    textClassName,
    onChange = () => {},
    size = 'm',
    checked = false,
    disabled = false,
    leftIcon,
    rightIcon,
    ...rest
  } = props;
  const { value: externalValue } = rest;
  const [value] = useState<string>(externalValue || children || '');

  return (
    <label
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max pbc-flex-nowrap pbc-items-center pbc-justify-center pbc-transition-colors pbc-bg-transparent pbc-text-basic-main pbc-cursor-pointer',
        'hover:pbc-bg-white/60 hover:pbc-text-primary-main',
        !checked && disabled && '!pbc-bg-transparent !pbc-text-basic-light',
        checked && !disabled && 'pbc-bg-white pbc-text-primary-darker hover:pbc-bg-white hover:pbc-text-primary-darker',
        checked && disabled && '!pbc-bg-white !pbc-text-basic-light',
        disabled && '!pbc-cursor-default',
        size === 's' && 'pbc-px-12 pbc-py-4 pbc-rounded-6',
        size === 'm' && 'pbc-px-16 pbc-py-8 pbc-rounded-8',
        className,
      )}
    >
      <input
        {...rest}
        ref={ref}
        type='radio'
        value={value}
        checked={checked}
        disabled={disabled}
        className='pbc pbc-hidden pbc-appearance-none'
        onChange={(event) => onChange(event.target.checked, value, event)}
      />
      <Content size={size} leftIcon={leftIcon} rightIcon={rightIcon} medium={true} className={textClassName}>
        {children}
      </Content>
    </label>
  );
});

InlineRadio.displayName = 'InlineRadio';

export default InlineRadio;
