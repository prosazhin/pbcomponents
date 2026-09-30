import { BadgeProps } from '@/components/shared/badge';
import usePopover from '@/hooks/use-popover';
import { OptionType } from '@/types';
import { ReactElement, useEffect, useMemo, useState } from 'react';

export type SelectOptionType = OptionType<BadgeProps | ReactElement<BadgeProps>>;

type SelectSingleProps = {
  multiple?: false;
  value?: SelectOptionType;
  defaultValue?: SelectOptionType;
  onChange?: (value: SelectOptionType | undefined) => void;
};

type SelectMultipleProps = {
  multiple: true;
  value?: SelectOptionType[];
  defaultValue?: SelectOptionType[];
  onChange?: (value: SelectOptionType[]) => void;
};

// выбор одного или нескольких пунктов — общий для Select и Search
export type SelectValueProps = SelectSingleProps | SelectMultipleProps;

const normalizeSelection = (value: SelectOptionType | SelectOptionType[] | undefined): SelectOptionType[] => {
  if (value === undefined) return [];
  if (Array.isArray(value)) return [...value];

  return [value];
};

export const getOptionKey = (option: SelectOptionType) => option.value ?? option.display;

// внутренний хук Select и Search: выбранные пункты, фильтр по запросу и попап со списком
export default function useSelectState(props: SelectValueProps & { options: SelectOptionType[] }) {
  const { options } = props;
  const multiple = props.multiple === true;
  // контролируемый режим — когда value передан пропсом, даже если он undefined (ничего не выбрано):
  // иначе снятие выбора в single-режиме переключало бы компонент в неконтролируемый и оставляло старое значение
  const isControlled = 'value' in props;

  const [query, setQuery] = useState<string>('');
  const [internalSelected, setInternalSelected] = useState<SelectOptionType[]>(() => normalizeSelection(props.defaultValue));
  const selected = useMemo(
    () => (isControlled ? normalizeSelection(props.value) : internalSelected),
    [isControlled, props.value, internalSelected],
  );

  const popover = usePopover({ matchTriggerWidth: true, openOn: 'manual', role: 'listbox' });
  const { open, setOpen } = popover;

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const isSelected = (option: SelectOptionType) => selected.some((item) => getOptionKey(item) === getOptionKey(option));

  const toggle = (option: SelectOptionType) => {
    const optionKey = getOptionKey(option);
    let result: SelectOptionType[];

    if (isSelected(option)) {
      result = multiple ? selected.filter((item) => getOptionKey(item) !== optionKey) : [];
    } else {
      result = multiple ? [...selected, option] : [option];
    }

    if (!isControlled) {
      setInternalSelected(result);
    }

    if (props.multiple === true) {
      props.onChange?.(result);
    } else {
      props.onChange?.(result[0]);
    }

    setOpen(false);
  };

  const filteredOptions = useMemo(
    () => (query === '' ? options : options.filter((item) => item.display.toLowerCase().includes(query.toLowerCase()))),
    [options, query],
  );
  const label = useMemo(() => selected.map(({ display }) => display).join(', '), [selected]);

  return { popover, query, setQuery, filteredOptions, label, isSelected, toggle };
}
