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
        'pbc pbc-relative pbc-w-full after:pbc-absolute after:pbc-inset-x-0 after:pbc-bottom-0 after:pbc-z-[1]',
        'after:pbc-bg-secondary-lighter after:pbc-h-2 after:pbc-w-full after:pbc-rounded-999',
        className,
      )}
    >
      <div
        className={clsx(
          'pbc-scrollbar-hidden pbc-relative pbc-z-[2] pbc-flex pbc-w-auto pbc-flex-row',
          'pbc-flex-nowrap pbc-items-center pbc-gap-x-16 pbc-overflow-x-auto',
        )}
      >
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
