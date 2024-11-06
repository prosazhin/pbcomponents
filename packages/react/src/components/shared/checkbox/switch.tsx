'use client';

import Content from '@/components/helpers/content';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

type BaseSwitchProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'children'> &
  SMSizeType &
  LabelPlaceType &
  WrapperClassNameType &
  TextClassNameType;

export interface SwitchProps extends BaseSwitchProps {
  children?: string;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
}

const Switch = forwardRef<InputType, SwitchProps>((props, ref) => {
  const {
    value: externalValue,
    onChange = () => {},
    labelPlace = 'right',
    size = 'm',
    checked = false,
    disabled = false,
    children,
    className,
    wrapperClassName,
    textClassName,
    ...rest
  } = props;
  const [value] = useState<string>(externalValue || children || '');

  return (
    <label
      className={clsx(
        'pbc pbc-inline-flex pbc-items-center pbc-cursor-pointer pbc-flex-nowrap pbc-group',
        size === 's' && 'pbc-gap-4',
        size === 'm' && 'pbc-gap-6',
        disabled && '!pbc-cursor-default',
        wrapperClassName,
      )}
    >
      <div className={clsx('pbc pbc-relative', size === 's' && 'pbc-w-32 pbc-h-16', size === 'm' && 'pbc-w-40 pbc-h-20')}>
        <input
          {...rest}
          ref={ref}
          type='checkbox'
          value={value}
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc pbc-size-full pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
            'pbc-rounded-999 pbc-bg-secondary-lighter group-hover:pbc-bg-secondary-light',
            'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter group-hover:disabled:!pbc-bg-basic-lighter',
            'checked:pbc-bg-primary-main group-hover:checked:pbc-bg-primary-darker disabled:checked:!pbc-bg-primary-light group-hover:disabled:checked:!pbc-bg-primary-light',
            'indeterminate:pbc-bg-primary-main group-hover:indeterminate:pbc-bg-primary-darker disabled:indeterminate:!pbc-bg-primary-light group-hover:disabled:indeterminate:!pbc-bg-primary-light',
            className,
          )}
          onChange={(event) => onChange(event.target.checked, value, event)}
        />
        <div
          className={clsx(
            'pbc pbc-bg-white pbc-absolute pbc-inset-y-0 pbc-rounded-999 pbc-m-auto pbc-pointer-events-none pbc-select-none',
            size === 's' && 'pbc-size-12',
            size === 'm' && 'pbc-size-16',
            checked ? 'pbc-right-2' : 'pbc-left-2',
          )}
        />
      </div>
      {children && (
        <Content
          className={clsx(
            'pbc-flex-1 pbc-transition-colors',
            labelPlace === 'left' && 'pbc-order-first pbc-justify-end',
            labelPlace === 'right' && 'pbc-order-last pbc-justify-start',
            disabled ? 'pbc-text-basic-light' : 'pbc-text-basic-main',
            textClassName,
          )}
          size={size}
        >
          {children}
        </Content>
      )}
    </label>
  );
});

Switch.displayName = 'Switch';

export default Switch;
