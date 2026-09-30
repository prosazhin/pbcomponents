'use client';

import ControlLabel from '@/components/helpers/control-label';
import Icon from '@/components/helpers/icon';
import { InputEvent, InputHTMLAttrs, InputType, LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import { CheckIcon as CheckMicroIcon, MinusIcon as MinusMicroIcon } from '@heroicons/react/16/solid';
import { CheckIcon as CheckMiniIcon, MinusIcon as MinusMiniIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { ReactNode, Ref, useEffect, useRef } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

type BaseCheckboxProps = Omit<InputHTMLAttrs, 'size' | 'onChange' | 'children'> &
  SMSizeType &
  LabelPlaceType &
  WrapperClassNameType &
  TextClassNameType;

export interface CheckboxProps extends BaseCheckboxProps {
  children?: string;
  description?: ReactNode;
  indeterminate?: boolean;
  value?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<InputType>;
}

const Checkbox = (props: CheckboxProps) => {
  const {
    value: externalValue,
    onChange = () => {},
    labelPlace = 'right',
    size = 'm',
    checked = false,
    indeterminate = false,
    disabled = false,
    description,
    children,
    className,
    wrapperClassName,
    textClassName,
    ref: externalRef,
    ...rest
  } = props;

  const internalRef = useRef<InputType>(null);
  const ref = useMergeRefs(internalRef, externalRef);

  const value = externalValue ?? children ?? '';

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [internalRef, indeterminate]);

  let ComponentIcon = size === 's' ? CheckMicroIcon : CheckMiniIcon;

  if (indeterminate) {
    ComponentIcon = size === 's' ? MinusMicroIcon : MinusMiniIcon;
  }

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
        <>
          <input
            {...rest}
            ref={ref}
            type='checkbox'
            value={value}
            checked={checked}
            disabled={disabled}
            className={clsx(
              'pbc pbc:cursor-pointer pbc:appearance-none pbc:transition pbc:duration-150 pbc:focus:ring-0 pbc:focus:ring-offset-0 pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0 pbc:m-0!',
              'pbc:rounded-4 pbc:bg-basic-0 pbc:inset-ring pbc:inset-ring-primary-200 pbc:group-hover:inset-ring-primary-300 pbc:focus:inset-ring-primary-300',
              'pbc:disabled:cursor-default! pbc:disabled:bg-secondary-100! pbc:disabled:inset-ring-secondary-200! pbc:group-hover:disabled:inset-ring-secondary-200! pbc:group-hover:disabled:bg-secondary-100!',
              'pbc:checked:bg-primary-300 pbc:checked:inset-ring-transparent pbc:group-hover:checked:bg-primary-400 pbc:focus:checked:bg-primary-400 pbc:disabled:checked:bg-primary-200! pbc:disabled:checked:inset-ring-transparent! pbc:group-hover:disabled:checked:bg-primary-200!',
              'pbc:indeterminate:bg-primary-300 pbc:indeterminate:inset-ring-transparent pbc:group-hover:indeterminate:bg-primary-400 pbc:focus:indeterminate:bg-primary-400 pbc:disabled:indeterminate:bg-primary-200! pbc:disabled:indeterminate:inset-ring-transparent! pbc:group-hover:disabled:indeterminate:bg-primary-200!',
              size === 's' && 'pbc:size-16',
              size === 'm' && 'pbc:size-20',
              className,
            )}
            onChange={(event) => onChange(event.target.checked, value, event)}
          />
          {(checked || indeterminate) && (
            <Icon
              tag={ComponentIcon}
              size={size === 's' ? 16 : 20}
              className='pbc:absolute pbc:inset-0 pbc:m-auto pbc:text-text-contrast pbc:pointer-events-none pbc:select-none'
            />
          )}
        </>
      }
    >
      {children}
    </ControlLabel>
  );
};

Checkbox.displayName = 'Checkbox';
export default Checkbox;
