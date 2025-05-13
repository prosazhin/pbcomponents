'use client';

import Content from '@/components/helpers/content';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { Ref, useState } from 'react';

type BaseSwitchProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'children'> &
  SMSizeType &
  LabelPlaceType &
  WrapperClassNameType &
  TextClassNameType;

export interface SwitchProps extends BaseSwitchProps {
  children?: string;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const Switch = (props: SwitchProps) => {
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
    ref,
    ...rest
  } = props;
  const [value] = useState<string>(externalValue || children || '');

  return (
    <label
      className={clsx(
        'pbc pbc:inline-flex pbc:items-center pbc:cursor-pointer pbc:flex-nowrap pbc:group',
        size === 's' && 'pbc:gap-4',
        size === 'm' && 'pbc:gap-6',
        disabled && 'pbc:!cursor-default',
        wrapperClassName,
      )}
    >
      <div className={clsx('pbc pbc:relative', size === 's' && 'pbc:w-32 pbc:h-16 pbc:-mt-3', size === 'm' && 'pbc:w-40 pbc:h-20')}>
        <input
          {...rest}
          ref={ref}
          type='checkbox'
          value={value}
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc pbc:size-full pbc:cursor-pointer pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:!m-0',
            'pbc:rounded-999 pbc:bg-secondary-lighter pbc:group-hover:bg-secondary-light',
            'pbc:disabled:!cursor-default pbc:disabled:!bg-basic-lighter pbc:group-hover:disabled:!bg-basic-lighter',
            'pbc:checked:bg-primary-main pbc:group-hover:checked:bg-primary-darker pbc:disabled:checked:!bg-primary-light pbc:group-hover:disabled:checked:!bg-primary-light',
            'pbc:indeterminate:bg-primary-main pbc:group-hover:indeterminate:bg-primary-darker pbc:disabled:indeterminate:!bg-primary-light pbc:group-hover:disabled:indeterminate:!bg-primary-light',
            className,
          )}
          onChange={(event) => onChange(event.target.checked, value, event)}
        />
        <div
          className={clsx(
            'pbc pbc:bg-white pbc:absolute pbc:inset-y-0 pbc:rounded-999 pbc:m-auto pbc:pointer-events-none pbc:select-none',
            size === 's' && 'pbc:size-12 pbc:top-3',
            size === 'm' && 'pbc:size-16',
            checked ? 'pbc:right-2' : 'pbc:left-2',
          )}
        />
      </div>
      {children && (
        <Content
          className={clsx(
            'pbc:flex-1 pbc:transition-colors pbc:duration-150',
            labelPlace === 'left' && 'pbc:order-first pbc:justify-end',
            labelPlace === 'right' && 'pbc:order-last pbc:justify-start',
            disabled ? 'pbc:text-basic-light' : 'pbc:text-basic-main',
            textClassName,
          )}
          size={size}
        >
          {children}
        </Content>
      )}
    </label>
  );
};

Switch.displayName = 'Switch';

export default Switch;
