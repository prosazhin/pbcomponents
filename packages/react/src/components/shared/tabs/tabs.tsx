import { ComponentType } from '@/types';
import clsx from 'clsx';

import Tab, { Props as TabProps } from '@/components/shared/tabs/tab';

export type Props<T extends TabProps> = ComponentType & {
  activeValue: string;
  options: T[];
  onChange: (value: T) => void;
};

const Tabs = <T extends TabProps>({ className, activeValue, options, onChange }: Props<T>) => {
  const children: React.ReactNode | undefined = options.find((tab) => tab.children && tab.value === activeValue)?.children;

  return (
    <div>
      <div
        className={clsx(
          'pbc pbc-relative pbc-w-full after:pbc-absolute after:pbc-inset-x-0 after:pbc-bottom-0 after:pbc-z-[1]',
          'after:pbc-bg-secondary-lighter after:pbc-h-2 after:pbc-w-full after:pbc-rounded-999',
          className,
        )}
      >
        <div
          className={clsx(
            'pbc pbc-scrollbar-hidden pbc-relative pbc-z-[2] pbc-flex pbc-w-auto pbc-flex-row',
            'pbc-flex-nowrap pbc-items-center pbc-gap-x-16 pbc-overflow-x-auto',
          )}
        >
          {options.map((item, index) => (
            <Tab key={index} {...item} active={item.value === activeValue} onClick={() => onChange(item)} />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Tabs;
