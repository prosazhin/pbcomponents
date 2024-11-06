'use client';

import Content from '@/components/helpers/content';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

type BaseRadioProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value' | 'children'> &
  LabelPlaceType &
  SMSizeType &
  WrapperClassNameType &
  TextClassNameType;

export interface RadioProps extends BaseRadioProps {
  children?: string;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
}

const Radio = forwardRef<InputType, RadioProps>((props, ref) => {
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
      <input
        {...rest}
        ref={ref}
        type='radio'
        value={value}
        checked={checked}
        disabled={disabled}
        className={clsx(
          'pbc pbc-relative pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
          'pbc-rounded-999 pbc-border-secondary-light group-hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
          'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-bg-basic-lighter',
          'checked:pbc-bg-primary-main checked:pbc-border-transparent group-hover:checked:pbc-bg-primary-darker disabled:checked:!pbc-bg-primary-light disabled:checked:!pbc-border-transparent group-hover:disabled:checked:!pbc-bg-primary-light',
          'before:pbc-absolute before:pbc-bg-transparent before:pbc-rounded-999 checked:before:pbc-bg-white before:pbc-inset-0 before:pbc-m-auto',
          size === 's' && 'pbc-size-16 before:pbc-size-6',
          size === 'm' && 'pbc-size-20 before:pbc-size-8',
          className,
        )}
        onChange={(event) => onChange(event.target.checked, value, event)}
      />
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

Radio.displayName = 'Radio';

export default Radio;
