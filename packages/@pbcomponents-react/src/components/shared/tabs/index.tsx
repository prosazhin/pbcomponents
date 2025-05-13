'use client';

import Tab, { TabProps } from '@/components/shared/tabs/item';
import { DivHTMLAttrs, DivType } from '@/types';
import clsx from 'clsx';
import { Ref, useMemo, useState } from 'react';

export interface TabsProps extends Omit<DivHTMLAttrs, 'children' | 'onChange'> {
  children: React.ReactElement<TabProps>[];
  defaultIndex?: number;
  onChange?: (index: number, event: React.MouseEvent<HTMLElement>) => void;
  ref?: Ref<DivType>;
}

const Tabs = (props: TabsProps) => {
  const { defaultIndex = 0, onChange = () => {}, children: childn, className, ref, ...rest } = props;
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const children = useMemo(() => (childn ? [...childn] : []), [childn, activeIndex, onChange]);

  if (!children.length) return null;

  return (
    <div {...rest} ref={ref} className={clsx('pbc pbc:w-full', className)}>
      <div
        className={clsx(
          'pbc pbc:relative pbc:w-full pbc:after:absolute pbc:after:inset-x-0 pbc:after:bottom-0 pbc:after:z-[1]',
          'pbc:after:bg-secondary-lighter pbc:after:h-2 pbc:after:w-full pbc:after:rounded-999',
        )}
      >
        <div
          className={clsx(
            'pbc pbc-scrollbar-hidden pbc:relative pbc:z-[2] pbc:flex pbc:w-auto pbc:flex-row',
            'pbc:flex-nowrap pbc:items-center pbc:gap-x-16 pbc:overflow-x-auto',
          )}
        >
          {children.map(({ props: itemProps }, index) => (
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
      {children[activeIndex].props.children}
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
