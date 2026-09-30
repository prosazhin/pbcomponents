'use client';

import ControlLabel from '@/components/helpers/control-label';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { ReactNode, Ref } from 'react';

type BaseToggleProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'children'> &
  SMSizeType &
  LabelPlaceType &
  WrapperClassNameType &
  TextClassNameType;

export interface ToggleProps extends BaseToggleProps {
  children?: string;
  description?: ReactNode;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const Toggle = (props: ToggleProps) => {
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
      kind='toggle'
      size={size}
      labelPlace={labelPlace}
      disabled={disabled}
      description={description}
      wrapperClassName={wrapperClassName}
      textClassName={textClassName}
      control={
        <>
          <input
            {...rest}
            ref={externalRef}
            type='checkbox'
            value={value}
            checked={checked}
            disabled={disabled}
            className={clsx(
              'pbc pbc:cursor-pointer pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:m-0!',
              'pbc:rounded-999 pbc:bg-primary-100 pbc:group-hover:bg-primary-200 pbc:focus:bg-primary-200',
              'pbc:disabled:cursor-default! pbc:disabled:bg-secondary-200! pbc:group-hover:disabled:bg-secondary-200!',
              'pbc:checked:bg-primary-300 pbc:group-hover:checked:bg-primary-400 pbc:focus:checked:bg-primary-400 pbc:disabled:checked:bg-secondary-200! pbc:group-hover:disabled:checked:bg-secondary-200!',
              size === 's' && 'pbc:w-32 pbc:h-16',
              size === 'm' && 'pbc:w-40 pbc:h-20',
              className,
            )}
            onChange={(event) => onChange(event.target.checked, value, event)}
          />
          <span
            className={clsx(
              'pbc pbc:bg-basic-0 pbc:absolute pbc:inset-y-0 pbc:rounded-999 pbc:m-auto pbc:pointer-events-none pbc:select-none pbc:transition-all pbc:duration-150',
              size === 's' && 'pbc:size-12',
              size === 'm' && 'pbc:size-16',
              checked ? 'pbc:left-[calc(100%-2px)] pbc:-translate-x-full' : 'pbc:left-2',
            )}
          />
        </>
      }
    >
      {children}
    </ControlLabel>
  );
};

Toggle.displayName = 'Toggle';
export default Toggle;
