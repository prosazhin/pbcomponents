'use client';

import Tab, { TabProps } from '@/components/shared/tabs/item';
import { DivHTMLAttrs, DivType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

export interface TabsProps extends Omit<DivHTMLAttrs, 'children' | 'onChange'> {
  children?: React.ReactElement<TabProps>[];
  defaultIndex?: number;
  onChange?: (index: number, event: React.MouseEvent<HTMLElement>) => void;
}

const Tabs = forwardRef<DivType, TabsProps>((props, ref) => {
  const { defaultIndex = 0, onChange = () => {}, children, className, ...rest } = props;
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);

  return (
    <div {...rest} ref={ref} className={clsx('pbc pbc-w-full', className)}>
      <div
        className={clsx(
          'pbc pbc-relative pbc-w-full after:pbc-absolute after:pbc-inset-x-0 after:pbc-bottom-0 after:pbc-z-[1]',
          'after:pbc-bg-secondary-lighter after:pbc-h-2 after:pbc-w-full after:pbc-rounded-999',
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
                  onChange(index, event);
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
