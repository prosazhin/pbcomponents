'use client';

import Icon from '@/components/helpers/icon';
import Button, { ButtonProps } from '@/components/shared/button/button';
import { ErrorType, InputEvent, InputHTMLAttrs, InputType, SMSizeType, WithIconsType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

type InputTType = React.ReactElement<ButtonProps>;
type BaseInputProps<T> = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'children' | 'value'> & {
  children?: T;
} & WithIconsType &
  ErrorType &
  SMSizeType &
  WrapperClassNameType;

export interface InputProps extends BaseInputProps<InputTType> {
  button?: 'left' | 'right';
  value?: string;
  onChange?: (value: string, event: InputEvent) => void;
}

const Input = forwardRef<InputType, InputProps>((props, ref) => {
  const {
    children,
    className,
    wrapperClassName,
    onChange = () => {},
    size = 'm',
    disabled = false,
    error = false,
    button = 'left',
    type = 'text',
    leftIcon,
    rightIcon,
    ...rest
  } = props;
  const { value: externalValue } = rest;
  const [value, setValue] = useState<string>(externalValue || '');

  function handleChange(event: InputEvent) {
    setValue(event.target.value);
    onChange(event.target.value, event);
  }

  return (
    <div
      className={clsx('pbc pbc-relative pbc-inline-flex pbc-flex-nowrap pbc-items-center pbc-justify-center pbc-w-full', wrapperClassName)}
    >
      <div className={clsx('pbc pbc-relative pbc-w-full pbc-z-0 hover:pbc-z-[1]')}>
        {leftIcon && (
          <Icon
            tag={leftIcon}
            size={size}
            className={clsx(
              'pbc-text-basic-light pbc-pointer-events-none pbc-select-none',
              'pbc-absolute pbc-inset-y-0 pbc-m-auto',
              size === 's' && 'pbc-left-8',
              size === 'm' && 'pbc-left-12',
            )}
          />
        )}
        <input
          {...rest}
          ref={ref}
          type={type}
          value={value}
          disabled={disabled}
          className={clsx(
            'pbc pbc-z-0 hover:pbc-z-[1] focus:pbc-z-[2] pbc-w-full pbc-border-solid pbc-border-1 pbc-rounded-8 pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-text-basic-main placeholder:pbc-text-basic-light',
            !error && 'pbc-border-secondary-light hover:pbc-border-primary-main focus:pbc-border-primary-main pbc-outline-primary',
            error && 'pbc-border-danger-main hover:pbc-border-danger-main focus:pbc-border-danger-main pbc-outline-danger',
            'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter disabled:!pbc-border-secondary-light hover:disabled:!pbc-border-secondary-light hover:disabled:!pbc-bg-basic-lighter',
            size === 's' && 'pbc-py-8 pbc-px-12 pbc-h-[34px] !pbc-text-t12',
            size === 's' && leftIcon && 'pbc-pl-32',
            size === 's' && rightIcon && 'pbc-pr-32',
            size === 'm' && 'pbc-py-12 pbc-px-16 pbc-h-48 !pbc-text-t16',
            size === 'm' && leftIcon && 'pbc-pl-[42px]',
            size === 'm' && rightIcon && 'pbc-pr-[42px]',
            children && button === 'left' && '!pbc-rounded-l-0 !pbc-rounded-r-8',
            children && button === 'right' && '!pbc-rounded-l-8 !pbc-rounded-r-0',
            className,
          )}
          onChange={handleChange}
        />
        {rightIcon && (
          <Icon
            tag={rightIcon}
            size={size}
            className={clsx(
              'pbc-text-basic-light pbc-pointer-events-none pbc-select-none',
              'pbc-absolute pbc-inset-y-0 pbc-m-auto',
              size === 's' && 'pbc-right-8',
              size === 'm' && 'pbc-right-12',
            )}
          />
        )}
      </div>
      {children && (
        <Button
          {...children.props}
          size={size}
          disabled={disabled}
          className={clsx(
            'pbc-z-0 hover:pbc-z-[1] focus:pbc-z-[2]',
            button === 'left' && 'pbc-order-first !-pbc-mr-1',
            button === 'left' && size === 's' && '!pbc-rounded-l-8 !pbc-rounded-r-0',
            button === 'left' && size === 'm' && '!pbc-rounded-l-12 !pbc-rounded-r-0',
            button === 'right' && 'pbc-order-last !-pbc-ml-1',
            button === 'right' && size === 's' && '!pbc-rounded-l-0 !pbc-rounded-r-8',
            button === 'right' && size === 'm' && '!pbc-rounded-l-0 !pbc-rounded-r-12',
            children.props.className,
          )}
        >
          Button
        </Button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
