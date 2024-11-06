'use client';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { forwardRef, useEffect, useRef, useState } from 'react';

type BaseCheckboxProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'children'> &
  SMSizeType &
  LabelPlaceType &
  WrapperClassNameType &
  TextClassNameType;

export interface CheckboxProps extends BaseCheckboxProps {
  children?: string;
  indeterminate?: boolean;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
}

const Checkbox = forwardRef<InputType, CheckboxProps>((props, ref) => {
  const {
    value: externalValue,
    onChange = () => {},
    labelPlace = 'right',
    size = 'm',
    checked = false,
    indeterminate = false,
    disabled = false,
    children,
    className,
    wrapperClassName,
    textClassName,
    ...rest
  } = props;
  const [value] = useState<string>(externalValue || children || '');
  const internalRef = useRef<InputType>(null);
  const checkboxRef = (ref || internalRef) as React.MutableRefObject<InputType>;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [checkboxRef, indeterminate]);

  let ComponentIcon = CheckIcon;

  if (indeterminate) {
    ComponentIcon = MinusIcon;
  }

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
      <div className={clsx('pbc pbc-relative', size === 's' && 'pbc-size-16', size === 'm' && 'pbc-size-20')}>
        <input
          {...rest}
          ref={checkboxRef}
          type='checkbox'
          value={value}
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc pbc-size-full pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
            'pbc-rounded-4 pbc-border-secondary-light group-hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
            'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-border-secondary-light group-hover:disabled:!pbc-bg-basic-lighter',
            'checked:pbc-bg-primary-main checked:pbc-border-transparent group-hover:checked:pbc-bg-primary-darker disabled:checked:!pbc-bg-primary-light disabled:checked:!pbc-border-transparent group-hover:disabled:checked:!pbc-bg-primary-light',
            'indeterminate:pbc-bg-primary-main indeterminate:pbc-border-transparent group-hover:indeterminate:pbc-bg-primary-darker disabled:indeterminate:!pbc-bg-primary-light disabled:indeterminate:!pbc-border-transparent group-hover:disabled:indeterminate:!pbc-bg-primary-light',
            className,
          )}
          onChange={(event) => onChange(event.target.checked, value, event)}
        />
        {(checked || indeterminate) && (
          <Icon
            tag={ComponentIcon}
            size={size}
            className='pbc-absolute pbc-inset-0 pbc-m-auto pbc-text-white pbc-pointer-events-none pbc-select-none'
          />
        )}
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
