'use client';

import Tab, { TabProps } from '@/components/shared/tabs/tab';
import { ComponentWrapperType, DivType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

export interface TabsProps<T> extends ComponentWrapperType<T> {
  defaultIndex?: number;
  onChange?: (index: number, event: React.MouseEvent<HTMLElement>) => void;
}

const Tabs = forwardRef<DivType, TabsProps<React.ReactElement<TabProps>>>((props, ref) => {
  const { children, className, defaultIndex = 0, onChange, ...rest } = props;
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

  return (
    <div>
      <div
        {...rest}
        ref={ref}
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
          {children &&
            children.map(({ props: itemProps }, index) => (
              <Tab
                {...itemProps}
                key={index}
                active={activeIndex === index}
                onClick={(event) => {
                  setActiveIndex(index);
                  if (onChange) onChange(index, event);
                }}
              />
            ))}
        </div>
      </div>
      {children && children[activeIndex].props.children}
    </div>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
