'use client';

import Content from '@/components/helpers/content';
import { CheckedType, ComponentType, DisabledType, InputType, SMSizeType, WithIconsType } from '@/types';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

type BaseInlineRadioItemProps = ComponentType & CheckedType & DisabledType & WithIconsType & SMSizeType;

export interface InlineRadioItemProps extends BaseInlineRadioItemProps {
  value: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InlineRadioItem = forwardRef<InputType, InlineRadioItemProps>((props, ref) => {
  const { children, className, value, onChange, size = 'm', checked = false, disabled = false, leftIcon, rightIcon, ...rest } = props;

  return (
    <label
      className={clsx(
        'pbc pbc-flex-inline pbc-transition-colors pbc-bg-transparent pbc-text-basic-main pbc-cursor-pointer',
        'hover:pbc-bg-white/60 hover:pbc-text-primary-main',
        checked && !disabled && 'pbc-bg-white pbc-text-primary-darker',
        disabled && '!pbc-bg-transparent !pbc-text-basic-light !pbc-cursor-default',
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
        className='pbc pbc-hidden'
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

InlineRadioItem.displayName = 'InlineRadioItem';

export default InlineRadioItem;
