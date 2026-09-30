'use client';

import SelectList from '@/components/helpers/select-list';
import Input from '@/components/shared/input';
import useSelectState, { SelectOptionType, SelectValueProps } from '@/hooks/use-select-state';
import { ErrorType, InputHTMLAttrs, SMSizeType, WrapperClassNameType } from '@/types';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ReactNode } from 'react';

type BaseSelectProps = Omit<InputHTMLAttrs, 'onChange' | 'value' | 'defaultValue' | 'size' | 'type' | 'children'> &
  SMSizeType &
  ErrorType &
  WrapperClassNameType;

export type SelectProps = BaseSelectProps & {
  className?: string;
  options: SelectOptionType[];
  searchPlaceholder?: string;
  search?: boolean;
  // кнопка слева или справа от поля (.select_with_button в фигме)
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  popoverClassName?: string;
  popoverItemClassName?: string;
} & SelectValueProps;

const Select = (props: SelectProps) => {
  const {
    size = 'm',
    error = false,
    disabled = false,
    placeholder,
    options: _options,
    multiple: _multiple,
    search = false,
    searchPlaceholder = 'Placeholder',
    className,
    wrapperClassName,
    leftAddon,
    rightAddon,
    popoverClassName,
    popoverItemClassName,
    value: _value,
    defaultValue: _defaultValue,
    onChange: _onChange,
    ...rest
  } = props;
  void _options;
  void _multiple;
  void _value;
  void _defaultValue;
  void _onChange;

  const state = useSelectState(props);
  const { popover, query, setQuery, label } = state;
  const { setOpen } = popover;

  return (
    <div ref={popover.refs.setReference} className={clsx('pbc pbc:relative pbc:w-full', wrapperClassName)}>
      <Input size={size} error={error} disabled={disabled} className={className}>
        {leftAddon && <Input.LeftAddon>{leftAddon}</Input.LeftAddon>}
        <Input.Control
          {...popover.getReferenceProps(rest)}
          value={label}
          type='text'
          placeholder={placeholder}
          leftIcon={undefined}
          rightIcon={ChevronUpDownIcon}
          readOnly
          textClassName='pbc:cursor-pointer'
          onClick={() => setOpen(true)}
          onFocus={() => setOpen(true)}
        />
        {rightAddon && <Input.RightAddon>{rightAddon}</Input.RightAddon>}
      </Input>
      <SelectList
        state={state}
        search={search ? { value: query, onChange: setQuery, placeholder: searchPlaceholder } : undefined}
        className={popoverClassName}
        itemClassName={popoverItemClassName}
      />
    </div>
  );
};

Select.displayName = 'Select';
export default Select;
