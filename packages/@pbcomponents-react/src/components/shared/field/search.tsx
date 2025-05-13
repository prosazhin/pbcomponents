'use client';

import Content from '@/components/helpers/content';
import Badge, { BadgeProps } from '@/components/shared/badge';
import Input, { InputProps } from '@/components/shared/field/input';
import { DivType, InputType, SelectDropdownOptionType } from '@/types';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import useKeydown from '@/hooks/use-keydown';

type SearchOptionType = SelectDropdownOptionType<React.ReactElement<BadgeProps>>;
type SearchMultipleProps = { multiple?: true; value?: SearchOptionType[] } | { multiple?: false; value?: SearchOptionType };

export type SearchProps = Omit<InputProps, 'onChange' | 'value'> & {
  options: SearchOptionType[];
  dropdownClassName?: string;
  dropdownItemClassName?: string;
  onChange?: (value: SearchOptionType | SearchOptionType[]) => void;
} & SearchMultipleProps;

const Search = (props: SearchProps) => {
  const {
    value: externalValue,
    onChange = () => {},
    options,
    multiple = false,
    className,
    wrapperClassName,
    dropdownClassName,
    dropdownItemClassName,
    ...rest
  } = props;
  const dropdownRef = useRef<DivType>(null);
  const inputRef = useRef<InputType>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<SearchOptionType[]>([]);
  const [value, setValue] = useState<string>('');

  useClickOutside([dropdownRef, inputRef], () => setOpen(false));
  useKeydown(['Escape'], () => setOpen(false));

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    if (externalValue) {
      const isArray = Array.isArray(externalValue);
      let result: SearchOptionType[] = [];

      if (isArray) result = [...externalValue];
      if (!isArray) result = [externalValue];

      setSelected(result);
    }
  }, []);

  useEffect(() => {
    const result: string[] = [];

    selected.forEach(({ display }) => {
      result.push(display);
    });

    if (selected.length) {
      onChange(multiple ? selected : selected[0]);
    }

    setValue(result.join(', '));
  }, [selected]);

  function handleChange(option: SearchOptionType) {
    let result: SearchOptionType[] = [...selected];

    if (result.some((item) => item.display === option.display)) {
      if (multiple) {
        result = result.filter((item) => item.display !== option.display);
      } else {
        result = [];
      }
    } else {
      if (multiple) {
        result.push(option);
      } else {
        result = [option];
      }
    }

    setOpen(false);
    setSelected(result);
  }

  const filteredOptions = useMemo(
    () => (query === '' ? options : options.filter((item: SearchOptionType) => item.display.toLowerCase().includes(query.toLowerCase()))),
    [options, query],
  );

  return (
    <div className={clsx('pbc pbc:relative pbc:w-full', wrapperClassName)}>
      <Input
        {...rest}
        ref={inputRef}
        value={open ? query : value}
        type='search'
        className={className}
        leftIcon={MagnifyingGlassIcon}
        rightIcon={undefined}
        buttonAlign='right'
        onClick={() => setOpen(!open)}
        onChange={(v) => setQuery(v)}
      />
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              ref={dropdownRef}
              className={clsx(
                'pbc:absolute pbc:inset-x-0 pbc:mx-auto pbc:z-10 pbc:box-border pbc:w-full pbc:max-h-[309px] pbc:bottom-0 pbc:translate-y-[calc(100%+6px)]',
                'pbc:bg-white pbc:rounded-16 pbc:border-1 pbc:border-solid pbc:border-secondary-lighter pbc:p-8 pbc-scrollbar-hidden pbc:overflow-y-auto',
                dropdownClassName,
              )}
              initial={{ opacity: 0, bottom: 6 }}
              animate={{ opacity: 1, bottom: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
              exit={{ opacity: 0, bottom: 6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <ul className='pbc:flex pbc:flex-col pbc:list-none pbc:m-0 pbc:p-0'>
                {filteredOptions.map((item, index) => {
                  const { display, disabled: disabledItem, badge } = item;

                  return (
                    <li key={index} className='pbc:w-full'>
                      <button
                        className={clsx(
                          'pbc pbc:w-full pbc:flex pbc:flex-row pbc:items-center pbc:gap-8 pbc:px-20 pbc:py-12 pbc:cursor-pointer pbc:transition-colors pbc:duration-150 pbc:rounded-12 pbc:max-h-48',
                          'pbc:bg-transparent pbc:text-basic-main pbc:hover:bg-secondary-lighter',
                          disabledItem && 'pbc:!cursor-default pbc:!text-basic-light pbc:!bg-transparent',
                          dropdownItemClassName,
                        )}
                        type='button'
                        disabled={disabledItem}
                        aria-disabled={disabledItem}
                        onClick={() => handleChange(item)}
                      >
                        <Content
                          size='m'
                          className={clsx('pbc:w-full pbc:text-left')}
                          leftIcon={CheckIcon}
                          leftIconClassName={clsx(
                            'pbc:invisible pbc:text-primary-darker',
                            selected.some((i) => i.display === display) && 'pbc:!visible',
                            disabledItem && 'pbc:!text-basic-light',
                          )}
                        >
                          {display}
                        </Content>
                        {badge && <Badge {...badge.props} size='s' />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

Search.displayName = 'Search';

export default Search;
