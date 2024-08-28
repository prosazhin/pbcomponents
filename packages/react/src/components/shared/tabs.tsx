import { useState } from 'react';

import { ComponentType, DisplayExtractor, extract } from '@/types';
import clsx from 'clsx';

import Tab from '@/components/helpers/tab';

export type Props<T> = ComponentType & {
  defaultIndex: number;
  options: T[];
  display: DisplayExtractor<T>;
  onChange: (index: number, tab: T) => void;
};

const Tabs = <T,>({ className, defaultIndex = 0, options, display, onChange }: Props<T>) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);

  const handleTabChange = (index: number, tab: T) => {
    setActiveTab(index);
    onChange(index, tab);
  };

  return (
    <div
      className={clsx(
        'after:bg-secondary-lighter relative w-full after:absolute after:inset-x-0 after:bottom-0 after:z-[1] after:h-[2px] after:w-full after:rounded-full',
        className,
      )}
    >
      <div className='scrollbar-hidden relative z-[2] flex w-auto flex-row flex-nowrap items-center gap-x-[16px] overflow-x-auto'>
        {options.map((item, index) => (
          <Tab key={index} {...item} active={activeTab === index} onClick={() => handleTabChange(index, item)}>
            {extract(item, display)}
          </Tab>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
