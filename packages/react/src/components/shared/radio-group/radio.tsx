'use client';

import Content from '@/components/helpers/content';
import { CheckedType, ComponentType, DisabledType, InputType, LabelPlaceType, RadioType, SMSizeType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseRadioProps = ComponentType & RadioType & LabelPlaceType & CheckedType & DisabledType & WithIconsType & SMSizeType;

export interface RadioProps extends BaseRadioProps {}

const Radio = forwardRef<InputType, RadioProps>((props, ref) => {
  const {
    children,
    className,
    onChange,
    labelPlace = 'right',
    size = 'm',
    checked = false,
    disabled = false,
    leftIcon,
    rightIcon,
    ...rest
  } = props;
  const { value } = rest;

  return (
    <label
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max pbc-cursor-pointer pbc-flex-nowrap pbc-group pbc-gap-8',
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
          'pbc-rounded-999 pbc-border-secondary-light group-hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
          'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-bg-basic-lighter',
          'checked:pbc-bg-primary-main checked:pbc-border-transparent group-hover:checked:pbc-bg-primary-darker disabled:checked:!pbc-bg-primary-light disabled:checked:!pbc-border-transparent group-hover:disabled:checked:!pbc-bg-primary-light',
          'before:pbc-absolute before:pbc-bg-transparent before:pbc-rounded-999 checked:before:pbc-bg-white before:pbc-inset-0 before:pbc-m-auto',
          size === 's' && 'pbc-size-16 before:pbc-size-6',
          size === 'm' && 'pbc-size-24 before:pbc-size-10',
        )}
        onChange={(event) => {
          if (onChange) onChange(value, event);
        }}
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
