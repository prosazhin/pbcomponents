'use client';

import Input from '@/components/shared/input';
import useMergeRefs from '@/hooks/use-merge-refs';
import { FloatingContext, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { CSSProperties, HTMLAttributes, ReactNode, Ref, useRef } from 'react';

export interface PopoverPanelSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface PopoverPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
  context: FloatingContext;
  floatingStyles: CSSProperties;
  open: boolean;
  // сторона, с которой попап стоит относительно триггера — он появляется, сдвигаясь от неё
  side?: 'top' | 'right' | 'bottom' | 'left';
  search?: PopoverPanelSearchProps;
  portal?: boolean;
  // переводить ли фокус внутрь попапа при открытии (для Select и Search фокус должен оставаться в поле)
  manageFocus?: boolean;
  // ширина задаётся снаружи (по ширине триггера), а не фиксированные 304px из фигмы
  matchTriggerWidth?: boolean;
  contentClassName?: string;
  ref?: Ref<HTMLDivElement>;
}

// визуальная оболочка попапа из фигмы (Popover): рамка, тень, опциональный поиск и область контента
const PopoverPanel = (props: PopoverPanelProps) => {
  const {
    children,
    context,
    floatingStyles,
    open,
    side = 'bottom',
    search,
    portal = false,
    manageFocus = true,
    matchTriggerWidth = false,
    className,
    contentClassName,
    style,
    ref: externalRef,
    ...rest
  } = props;

  // сдвиг при появлении: попап выезжает на 6px со стороны триггера
  // при открытии фокус ставится на сам попап, а не на первую кнопку внутри
  const panelRef = useRef<HTMLDivElement>(null);
  const ref = useMergeRefs(panelRef, externalRef);

  const offset = { top: { y: 6 }, bottom: { y: -6 }, left: { x: 6 }, right: { x: -6 } }[side];

  const panel = (
    <div {...rest} ref={ref} style={{ ...floatingStyles, ...style }} className='pbc pbc:z-50 pbc:flex pbc:flex-col pbc:outline-none'>
      <m.div
        initial={{ opacity: 0, ...offset }}
        animate={{ opacity: 1, x: 0, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
        exit={{ opacity: 0, ...offset, transition: { duration: 0.2, ease: 'easeIn' } }}
        className={clsx(
          'pbc pbc:flex pbc:min-h-0 pbc:flex-1 pbc:flex-col pbc:overflow-hidden pbc:py-8',
          matchTriggerWidth ? 'pbc:w-full' : 'pbc:w-304 pbc:max-w-[calc(100vw-16px)]',
          'pbc:bg-basic-0 pbc:rounded-16 pbc:inset-ring pbc:inset-ring-secondary-100 pbc:shadow-lg',
          className,
        )}
      >
        {search && (
          <div className='pbc pbc:flex pbc:w-full pbc:shrink-0 pbc:flex-col'>
            <div className='pbc pbc:w-full pbc:px-8'>
              <Input size='s'>
                <Input.Control
                  value={search.value}
                  placeholder={search.placeholder}
                  leftIcon={MagnifyingGlassIcon}
                  type='search'
                  autoFocus
                  onChange={(value: string) => search.onChange(value)}
                />
              </Input>
            </div>
            <div className='pbc pbc:w-full pbc:py-8'>
              <div className='pbc pbc:h-1 pbc:w-full pbc:bg-secondary-200' />
            </div>
          </div>
        )}
        <div className={clsx('pbc pbc-scrollbar-hidden pbc:min-h-0 pbc:w-full pbc:flex-1 pbc:overflow-y-auto pbc:px-8', contentClassName)}>
          {children}
        </div>
      </m.div>
    </div>
  );

  const content = (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open &&
          (manageFocus ? (
            <FloatingFocusManager key='popover' context={context} modal={false} initialFocus={search ? -1 : panelRef}>
              {panel}
            </FloatingFocusManager>
          ) : (
            <div key='popover' className='pbc:contents'>
              {panel}
            </div>
          ))}
      </AnimatePresence>
    </LazyMotion>
  );

  return portal ? <FloatingPortal>{content}</FloatingPortal> : content;
};

PopoverPanel.displayName = 'PopoverPanel';
export default PopoverPanel;
