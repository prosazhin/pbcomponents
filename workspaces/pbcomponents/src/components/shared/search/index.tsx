'use client';

import SelectList from '@/components/helpers/select-list';
import Input from '@/components/shared/input';
import useSelectState, { SelectOptionType, SelectValueProps } from '@/hooks/use-select-state';
import { ErrorType, InputHTMLAttrs, SMSizeType, WrapperClassNameType } from '@/types';
import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ReactNode } from 'react';

type BaseSearchProps = Omit<InputHTMLAttrs, 'onChange' | 'value' | 'defaultValue' | 'size' | 'type' | 'children'> &
  SMSizeType &
  ErrorType &
  WrapperClassNameType;

export type SearchProps = BaseSearchProps & {
  className?: string;
  options: SelectOptionType[];
  // кнопка слева или справа от поля (.search_with_button в фигме)
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  popoverClassName?: string;
  popoverItemClassName?: string;
} & SelectValueProps;

const Search = (props: SearchProps) => {
  const {
    size = 'm',
    error = false,
    disabled = false,
    placeholder,
    options: _options,
    multiple: _multiple,
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
  const { open, setOpen } = popover;

  return (
    <div ref={popover.refs.setReference} className={clsx('pbc pbc:relative pbc:w-full', wrapperClassName)}>
      <Input size={size} error={error} disabled={disabled} className={className}>
        {leftAddon && <Input.LeftAddon>{leftAddon}</Input.LeftAddon>}
        <Input.Control
          {...popover.getReferenceProps(rest)}
          value={open ? query : label}
          type='search'
          placeholder={placeholder}
          leftIcon={MagnifyingGlassIcon}
          rightIcon={ChevronUpDownIcon}
          onClick={() => setOpen(true)}
          onFocus={() => setOpen(true)}
          onChange={(v: string) => {
            setOpen(true);
            setQuery(v);
          }}
        />
        {rightAddon && <Input.RightAddon>{rightAddon}</Input.RightAddon>}
      </Input>
      <SelectList state={state} className={popoverClassName} itemClassName={popoverItemClassName} />
    </div>
  );
};

Search.displayName = 'Search';
export default Search;
