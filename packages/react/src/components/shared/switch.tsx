'use client';

import Content from '@/components/helpers/content';
import { CheckedType, ComponentType, DisabledType, InputType, LabelPlaceType, SMSizeType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseSwitchProps = ComponentType & LabelPlaceType & CheckedType & DisabledType & WithIconsType & SMSizeType;

export interface SwitchProps extends BaseSwitchProps {
  onChange?: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = forwardRef<InputType, SwitchProps>((props, ref) => {
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

  return (
    <label
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max pbc-cursor-pointer pbc-flex-nowrap pbc-group pbc-gap-8',
        disabled && '!pbc-cursor-default',
        className,
      )}
    >
      <div className={clsx('pbc pbc-relative', size === 's' && 'pbc-w-32 pbc-h-16', size === 'm' && 'pbc-w-48 pbc-h-24')}>
        <input
          {...rest}
          ref={ref}
          type='checkbox'
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc pbc-size-full pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
            'pbc-rounded-999 pbc-bg-secondary-lighter group-hover:pbc-bg-secondary-light',
            'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter group-hover:disabled:!pbc-bg-basic-lighter',
            'checked:pbc-bg-primary-main group-hover:checked:pbc-bg-primary-darker disabled:checked:!pbc-bg-primary-light group-hover:disabled:checked:!pbc-bg-primary-light',
            'indeterminate:pbc-bg-primary-main group-hover:indeterminate:pbc-bg-primary-darker disabled:indeterminate:!pbc-bg-primary-light group-hover:disabled:indeterminate:!pbc-bg-primary-light',
          )}
          onChange={(event) => {
            if (onChange) onChange(event.target.checked, event);
          }}
        />
        <div
          className={clsx(
            'pbc pbc-bg-white pbc-absolute pbc-inset-y-0 pbc-rounded-999 pbc-m-auto pbc-pointer-events-none pbc-select-none',
            size === 's' && 'pbc-size-12',
            size === 'm' && 'pbc-size-20',
            checked ? 'pbc-right-2' : 'pbc-left-2',
          )}
        />
      </div>
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

Switch.displayName = 'Switch';

export default Switch;
