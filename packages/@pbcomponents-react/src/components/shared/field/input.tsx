'use client';

import Icon from '@/components/helpers/icon';
import Button, { ButtonProps } from '@/components/shared/button';
import { ErrorType, InputEvent, InputHTMLAttrs, InputType, SMSizeType, WithIconsType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { Ref } from 'react';

type BaseInputProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value'> & WithIconsType & ErrorType & SMSizeType & WrapperClassNameType;
export interface InputProps extends BaseInputProps {
  button?: React.ReactElement<ButtonProps>;
  buttonAlign?: 'left' | 'right';
  value: string;
  onChange?: (value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const Input = (props: InputProps) => {
  const {
    onChange = () => {},
    size = 'm',
    disabled = false,
    error = false,
    button,
    buttonAlign = 'left',
    type = 'text',
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    className,
    wrapperClassName,
    ref,
    ...rest
  } = props;

  return (
    <div className={clsx('pbc pbc:relative pbc:flex pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:w-full', wrapperClassName)}>
      <div className={clsx('pbc pbc:relative pbc:w-full pbc:z-10 pbc:hover:z-30')}>
        {leftIcon && (
          <Icon
            tag={leftIcon}
            size={size}
            className={clsx(
              'pbc:text-basic-light pbc:pointer-events-none pbc:select-none',
              'pbc:absolute pbc:inset-y-0 pbc:m-auto',
              size === 's' && 'pbc:left-8',
              size === 'm' && 'pbc:left-12',
              leftIconClassName,
            )}
          />
        )}
        <input
          {...rest}
          ref={ref}
          type={type}
          disabled={disabled}
          className={clsx(
            'pbc pbc:w-full pbc:border-solid pbc:border-1 pbc:bg-transparent pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:text-basic-main pbc:placeholder:text-basic-light',
            !error &&
              'pbc:border-secondary-light pbc:hover:border-primary-main pbc:focus:border-primary-main pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0',
            error &&
              'pbc:border-danger-main pbc:hover:border-danger-main pbc:focus:border-danger-main pbc:focus:outline-outline-danger pbc:outline-4 pbc:outline-offset-0',
            'pbc:disabled:!cursor-default pbc:disabled:!bg-basic-lighter pbc:disabled:!border-secondary-light pbc:hover:disabled:!border-secondary-light pbc:hover:disabled:!bg-basic-lighter',
            size === 's' && 'pbc:py-8 pbc:px-12 pbc:h-[34px] pbc:!text-t12 pbc:rounded-8',
            size === 's' && leftIcon && 'pbc:pl-32',
            size === 's' && rightIcon && 'pbc:pr-32',
            size === 's' && button && buttonAlign === 'left' && 'pbc:!rounded-l-0',
            size === 's' && button && buttonAlign === 'right' && 'pbc:!rounded-r-0',
            size === 'm' && 'pbc:py-12 pbc:px-16 pbc:h-48 pbc:!text-t16 pbc:rounded-12',
            size === 'm' && leftIcon && 'pbc:pl-[42px]',
            size === 'm' && rightIcon && 'pbc:pr-[42px]',
            size === 'm' && button && buttonAlign === 'left' && 'pbc:!rounded-l-0',
            size === 'm' && button && buttonAlign === 'right' && 'pbc:!rounded-r-0',
            type === 'search' && 'pbc-search',
            type === 'search' && size === 's' && 'pbc-search-s',
            type === 'search' && size === 'm' && 'pbc-search-m',
            className,
          )}
          onChange={(event: InputEvent) => onChange(event.target.value, event)}
        />
        {rightIcon && (
          <Icon
            tag={rightIcon}
            size={size}
            className={clsx(
              'pbc:text-basic-light pbc:pointer-events-none pbc:select-none',
              'pbc:absolute pbc:inset-y-0 pbc:m-auto',
              size === 's' && 'pbc:right-8',
              size === 'm' && 'pbc:right-12',
              rightIconClassName,
            )}
          />
        )}
      </div>
      {button && (
        <Button
          {...button.props}
          size={size}
          disabled={disabled}
          className={clsx(
            'pbc:relative pbc:z-0 pbc:hover:z-20 pbc:focus:z-20 pbc:!w-auto',
            buttonAlign === 'left' && 'pbc:order-first pbc:!-mr-1 pbc:!rounded-r-0',
            buttonAlign === 'right' && 'pbc:order-last pbc:!-ml-1 pbc:!rounded-l-0',
            button.props.className,
          )}
        />
      )}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
