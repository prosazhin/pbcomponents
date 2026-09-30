'use client';

import Tab, { TabProps, TabTheme } from '@/components/shared/tab';
import useControllableState from '@/hooks/use-controllable-state';
import { ButtonOrLinkType } from '@/types';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'motion/react';
import {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  Ref,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  children: ReactElement<TabProps>[];
  // индекс активного таба: если передан — табами управляют снаружи
  index?: number;
  defaultIndex?: number;
  theme?: TabTheme;
  onChange?: (index: number, event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  ref?: Ref<HTMLDivElement>;
}

const Tabs = (props: TabsProps) => {
  const {
    index: externalIndex,
    defaultIndex = 0,
    theme = 'line',
    onChange = () => {},
    children: childn,
    className,
    ref: externalRef,
    ...rest
  } = props;

  const [activeIndex = 0, setActiveIndex] = useControllableState<number>({ value: externalIndex, defaultValue: defaultIndex });
  const baseId = useId();
  const [indicatorStyle, setIndicatorStyle] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(ButtonOrLinkType | null)[]>([]);

  const children = useMemo(() => (childn ? [...childn] : []), [childn]);
  // индекс вне списка (defaultIndex больше числа табов или табов стало меньше) не должен ронять компонент
  const currentIndex = Math.min(Math.max(activeIndex, 0), Math.max(children.length - 1, 0));

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const tabsElement = tabsRef.current;

    const updateIndicator = () => {
      const activeTab = tabRefs.current[currentIndex];

      if (!tabsElement || !activeTab) {
        setIndicatorStyle(null);

        return;
      }

      setIndicatorStyle({
        x: activeTab.offsetLeft,
        y: activeTab.offsetTop,
        width: activeTab.offsetWidth,
        height: activeTab.offsetHeight,
      });
    };

    updateIndicator();

    if (typeof ResizeObserver !== 'undefined' && tabsElement) {
      const observer = new ResizeObserver(updateIndicator);

      observer.observe(tabsElement);
      tabRefs.current.forEach((tab) => tab && observer.observe(tab));

      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [currentIndex, children, theme]);

  if (!children.length) return null;

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;

  const selectTab = (index: number, event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    setActiveIndex(index);
    onChange(index, event);
  };

  // стрелки, Home и End переключают табы, пропуская задизейбленные (паттерн tablist из WAI-ARIA)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = children.map((_, index) => index).filter((index) => !children[index].props.disabled);
    if (!enabled.length) return;

    const position = enabled.indexOf(currentIndex);
    let next: number | undefined;

    if (event.key === 'ArrowRight') next = enabled[(position + 1) % enabled.length];
    if (event.key === 'ArrowLeft') next = enabled[(position - 1 + enabled.length) % enabled.length];
    if (event.key === 'Home') next = enabled[0];
    if (event.key === 'End') next = enabled[enabled.length - 1];
    if (next === undefined) return;

    event.preventDefault();
    tabRefs.current[next]?.focus();
    if (next !== currentIndex) selectTab(next, event);
  };

  const tabs = children.map(({ props: itemProps }, index) => (
    <Tab
      {...itemProps}
      key={index}
      id={tabId(index)}
      role='tab'
      aria-selected={currentIndex === index}
      aria-controls={panelId}
      // в список табов попадаем по Tab один раз — на активный таб, дальше стрелками
      tabIndex={currentIndex === index ? 0 : -1}
      theme={theme}
      active={currentIndex === index}
      indicator={false}
      ref={(value) => {
        tabRefs.current[index] = value;
      }}
      onClick={(event) => {
        itemProps.onClick?.(event);
        selectTab(index, event);
      }}
    />
  ));

  const isLine = theme === 'line';

  const indicator = indicatorStyle && (
    <LazyMotion features={domAnimation}>
      <m.div
        aria-hidden
        className={clsx(
          'pbc pbc:absolute pbc:top-0 pbc:left-0 pbc:rounded-999',
          isLine ? 'pbc:z-3 pbc:bg-primary-300' : 'pbc:z-0',
          theme === 'pill' && 'pbc:bg-primary-300',
          theme === 'pill-secondary' && 'pbc:bg-secondary-300',
        )}
        initial={false}
        animate={
          isLine
            ? { x: indicatorStyle.x, y: indicatorStyle.y + indicatorStyle.height - 2, width: indicatorStyle.width, height: 2 }
            : { x: indicatorStyle.x, y: indicatorStyle.y, width: indicatorStyle.width, height: indicatorStyle.height }
        }
        transition={mounted ? { duration: 0.2, ease: 'easeInOut' } : { duration: 0 }}
      />
    </LazyMotion>
  );

  return (
    <div {...rest} ref={externalRef} className={clsx('pbc pbc:w-full', className)}>
      {!isLine ? (
        <div
          ref={tabsRef}
          role='tablist'
          onKeyDown={handleKeyDown}
          className={clsx(
            'pbc pbc-scrollbar-hidden pbc:relative pbc:flex pbc:w-max pbc:max-w-full pbc:flex-row',
            'pbc:flex-nowrap pbc:items-center pbc:gap-x-8 pbc:overflow-x-auto',
          )}
        >
          {indicator}
          {tabs}
        </div>
      ) : (
        <div
          className={clsx(
            'pbc pbc:relative pbc:w-full pbc:after:absolute pbc:after:inset-x-0 pbc:after:bottom-0 pbc:after:z-1',
            'pbc:after:bg-secondary-200 pbc:after:h-2 pbc:after:w-full pbc:after:rounded-999',
          )}
        >
          <div
            ref={tabsRef}
            role='tablist'
            onKeyDown={handleKeyDown}
            className={clsx(
              'pbc pbc-scrollbar-hidden pbc:relative pbc:z-2 pbc:flex pbc:w-auto pbc:flex-row',
              'pbc:flex-nowrap pbc:items-center pbc:gap-x-16 pbc:overflow-x-auto',
            )}
          >
            {indicator}
            {tabs}
          </div>
        </div>
      )}
      <div role='tabpanel' id={panelId} aria-labelledby={tabId(currentIndex)} className='pbc pbc:w-full'>
        {children[currentIndex].props.children}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';
export default Tabs;
