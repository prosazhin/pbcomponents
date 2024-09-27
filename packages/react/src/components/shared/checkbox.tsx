'use client';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';
import { CheckedType, ComponentType, DisabledType, IndeterminateType, InputType, LabelPlaceType, SMSizeType, WithIconsType } from '@/types';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';

type BaseCheckboxProps = ComponentType & LabelPlaceType & CheckedType & IndeterminateType & DisabledType & WithIconsType & SMSizeType;

export interface CheckboxProps extends BaseCheckboxProps {
  onChange?: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = forwardRef<InputType, CheckboxProps>((props, ref) => {
  const {
    children,
    className,
    onChange,
    labelPlace = 'right',
    size = 'm',
    checked = false,
    indeterminate = false,
    disabled = false,
    leftIcon,
    rightIcon,
    ...rest
  } = props;

  const internalRef = useRef<InputType>(null);
  const checkboxRef = (ref || internalRef) as React.MutableRefObject<InputType>;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [checkboxRef, indeterminate]);

  let IconIcon = CheckIcon;

  if (indeterminate) {
    IconIcon = MinusIcon;
  }

  return (
    <label
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max pbc-cursor-pointer pbc-flex-nowrap pbc-group pbc-gap-8',
        disabled && '!pbc-cursor-default',
        className,
      )}
    >
      <div className={clsx('pbc pbc-relative', size === 's' && 'pbc-size-16', size === 'm' && 'pbc-size-24')}>
        <input
          {...rest}
          ref={checkboxRef}
          type='checkbox'
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc pbc-size-full pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
            'pbc-rounded-4 pbc-border-secondary-light group-hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
            'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-bg-basic-lighter',
            'checked:pbc-bg-primary-main checked:pbc-border-transparent group-hover:checked:pbc-bg-primary-darker disabled:checked:!pbc-bg-primary-light disabled:checked:!pbc-border-transparent group-hover:disabled:checked:!pbc-bg-primary-light',
            'indeterminate:pbc-bg-primary-main indeterminate:pbc-border-transparent group-hover:indeterminate:pbc-bg-primary-darker disabled:indeterminate:!pbc-bg-primary-light disabled:indeterminate:!pbc-border-transparent group-hover:disabled:indeterminate:!pbc-bg-primary-light',
          )}
          onChange={(event) => {
            if (onChange) onChange(event.target.checked, event);
          }}
        />
        {(checked || indeterminate) && (
          <Icon
            tag={IconIcon}
            size={size}
            className='pbc-absolute pbc-inset-0 pbc-m-auto pbc-text-white pbc-pointer-events-none pbc-select-none'
          />
        )}
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
