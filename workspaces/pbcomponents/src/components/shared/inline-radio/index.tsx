'use client';

import Content from '@/components/helpers/content';
import { InputEvent, InputHTMLAttrs, InputType, SMSizeType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { Ref } from 'react';

type BaseInlineRadioProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value' | 'children'> &
  SMSizeType &
  WithIconsType &
  TextClassNameType;

export interface InlineRadioProps extends BaseInlineRadioProps {
  children?: string;
  value?: string;
  indicator?: boolean;
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
        'pbc pbc:relative pbc:z-1 pbc:inline-flex pbc:w-max pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:transition-colors pbc:duration-150 pbc:bg-transparent pbc:text-basic-main pbc:cursor-pointer',
        'pbc:hover:bg-white/60 pbc:hover:text-primary-main',
        !checked && disabled && 'pbc:bg-transparent! pbc:text-basic-light!',
        checked && !disabled && 'pbc:text-primary-darker pbc:hover:text-primary-darker',
        checked && disabled && 'pbc:text-basic-light!',
        checked && indicator && 'pbc:bg-white pbc:hover:bg-white',
        checked && disabled && indicator && 'pbc:bg-white!',
        disabled && 'pbc:cursor-default!',
        size === 's' && 'pbc:px-12 pbc:py-4 pbc:rounded-6',
        size === 'm' && 'pbc:px-16 pbc:py-8 pbc:rounded-8',
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
        className='pbc pbc:hidden pbc:appearance-none'
        onChange={(event) => onChange(event.target.checked, value, event)}
      />
      <Content
        size={size}
        leftIcon={leftIcon}
        leftIconClassName={leftIconClassName}
        rightIcon={rightIcon}
        rightIconClassName={rightIconClassName}
        medium={true}
        className={textClassName}
      >
        {children}
      </Content>
    </label>
  );
};

InlineRadio.displayName = 'InlineRadio';
export default InlineRadio;
