'use client';

import ControlLabel from '@/components/helpers/control-label';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { ReactNode, Ref } from 'react';

type BaseRadioProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'value' | 'children'> &
  LabelPlaceType &
  SMSizeType &
  WrapperClassNameType &
  TextClassNameType;

export interface RadioProps extends BaseRadioProps {
  children?: string;
  description?: ReactNode;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const Radio = (props: RadioProps) => {
  const {
    value: externalValue,
    onChange = () => {},
    labelPlace = 'right',
    size = 'm',
    checked = false,
    disabled = false,
    description,
    children,
    className,
    wrapperClassName,
    textClassName,
    ref: externalRef,
    ...rest
  } = props;

  const value = externalValue ?? children ?? '';

  return (
    <ControlLabel
      kind='checkbox'
      size={size}
      labelPlace={labelPlace}
      disabled={disabled}
      description={description}
      wrapperClassName={wrapperClassName}
      textClassName={textClassName}
      control={
        <input
          {...rest}
          ref={externalRef}
          type='radio'
          value={value}
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc pbc:relative pbc:cursor-pointer pbc:appearance-none pbc:transition pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:m-0!',
            'pbc:rounded-999 pbc:bg-basic-0 pbc:inset-ring pbc:inset-ring-primary-200 pbc:group-hover:inset-ring-primary-300 pbc:focus:inset-ring-primary-300',
            'pbc:disabled:cursor-default! pbc:disabled:bg-secondary-100! pbc:disabled:inset-ring-secondary-200! pbc:group-hover:disabled:inset-ring-secondary-200! pbc:group-hover:disabled:bg-secondary-100!',
            'pbc:checked:bg-primary-300 pbc:checked:inset-ring-transparent pbc:group-hover:checked:bg-primary-400 pbc:focus:checked:bg-primary-400 pbc:disabled:checked:bg-primary-200! pbc:disabled:checked:inset-ring-transparent! pbc:group-hover:disabled:checked:bg-primary-200!',
            'pbc:before:absolute pbc:before:bg-transparent pbc:before:rounded-999 pbc:checked:before:bg-basic-0 pbc:before:inset-0 pbc:before:m-auto',
            size === 's' && 'pbc:size-16 pbc:before:size-6',
            size === 'm' && 'pbc:size-20 pbc:before:size-8',
            className,
          )}
          onChange={(event) => onChange(event.target.checked, value, event)}
        />
      }
    >
      {children}
    </ControlLabel>
  );
};

Radio.displayName = 'Radio';
export default Radio;
