'use client';

import PopoverPanel, { PopoverPanelSearchProps } from '@/components/helpers/popover-panel';
import SelectOption from '@/components/helpers/select-option';
import useSelectState, { getOptionKey } from '@/hooks/use-select-state';

export interface SelectListProps {
  state: ReturnType<typeof useSelectState>;
  search?: PopoverPanelSearchProps;
  className?: string;
  itemClassName?: string;
}

// попап со списком пунктов у Select и Search
const SelectList = (props: SelectListProps) => {
  const { state, search, className, itemClassName } = props;
  const { popover, filteredOptions, isSelected, toggle } = state;

  return (
    <PopoverPanel
      {...popover.getFloatingProps()}
      ref={popover.refs.setFloating}
      context={popover.context}
      floatingStyles={popover.floatingStyles}
      open={popover.open}
      side={popover.side}
      manageFocus={false}
      matchTriggerWidth
      search={search}
      className={className}
    >
      <ul className='pbc:flex pbc:flex-col pbc:list-none pbc:m-0 pbc:p-0'>
        {filteredOptions.map((item, index) => (
          <li key={`${getOptionKey(item)}-${index}`} className='pbc:w-full'>
            <SelectOption
              selected={isSelected(item)}
              disabled={item.disabled}
              badge={item.badge}
              className={itemClassName}
              onClick={() => toggle(item)}
            >
              {item.display}
            </SelectOption>
          </li>
        ))}
      </ul>
    </PopoverPanel>
  );
};

SelectList.displayName = 'SelectList';
export default SelectList;
