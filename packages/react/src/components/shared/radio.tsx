'use client';

import Content from '@/components/helpers/content';
import { CheckedType, DisabledType, InputHTMLAttributes, InputType, LabelPlaceType, SMSizeType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseRadioProps = InputHTMLAttributes & LabelPlaceType & CheckedType & DisabledType & WithIconsType & SMSizeType;

export interface RadioProps extends BaseRadioProps {}

const Radio = forwardRef<InputType, RadioProps>((props, ref) => {
  const { children, className, labelPlace = 'right', size = 'm', checked = false, disabled = false, leftIcon, rightIcon, ...rest } = props;

  return (
    <label
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max pbc-cursor-pointer pbc-flex-nowrap pbc-gap-x-8',
        disabled && '!pbc-cursor-default',
        className,
      )}
    >
      <input
        {...rest}
        ref={ref}
        type='radio'
        checked={checked}
        disabled={disabled}
        className={clsx(
          'pbc pbc-relative pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
          'pbc-rounded-999 pbc-border-secondary-light hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
          'checked:pbc-bg-primary-main checked:pbc-border-transparent hover:checked:pbc-bg-primary-darker disabled:checked:pbc-bg-primary-light disabled:checked:pbc-border-transparent hover:disabled:checked:pbc-bg-primary-light',
          'before:pbc-absolute before:pbc-bg-transparent before:pbc-rounded-999 checked:before:pbc-bg-white before:pbc-inset-0 before:pbc-m-auto',
          size === 's' && 'pbc-size-16 before:pbc-size-6',
          size === 'm' && 'pbc-size-24 before:pbc-size-10',
        )}
      />
      {children && (
        <Content
          className={clsx(
            'pbc-flex-1 pbc-transition-colors',
            labelPlace === 'left' && 'pbc-order-first',
            labelPlace === 'right' && 'pbc-order-last',
            disabled ? 'pbc-text-basic-light' : 'pbc-text-basic-main',
          )}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </Content>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

export default Radio;
