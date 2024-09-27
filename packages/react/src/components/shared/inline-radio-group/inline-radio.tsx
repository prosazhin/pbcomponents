'use client';

import Content from '@/components/helpers/content';
import { CheckedType, ComponentType, DisabledType, InputType, RadioType, SMSizeType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseInlineRadioProps = ComponentType & RadioType & CheckedType & DisabledType & WithIconsType & SMSizeType;

export interface InlineRadioProps extends BaseInlineRadioProps {}

const InlineRadio = forwardRef<InputType, InlineRadioProps>((props, ref) => {
  const { children, className, onChange, size = 'm', checked = false, disabled = false, leftIcon, rightIcon, ...rest } = props;
  const { value } = rest;

  return (
    <label
      className={clsx(
        'pbc pbc-flex-inline pbc-transition-colors pbc-bg-transparent pbc-text-basic-main pbc-cursor-pointer',
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
        checked={checked}
        disabled={disabled}
        className='pbc pbc-hidden pbc-appearance-none'
        onChange={(event) => {
          if (onChange) onChange(value, event);
        }}
      />
      <Content size={size} leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
        {children}
      </Content>
    </label>
  );
});

InlineRadio.displayName = 'InlineRadio';

export default InlineRadio;
