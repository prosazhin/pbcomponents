'use client';

import Text from '@/components/helpers/text';
import usePopover, { PopoverPlacement } from '@/hooks/use-popover';
import { FloatingArrow, FloatingPortal } from '@floating-ui/react';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { ReactElement, ReactNode, Ref, cloneElement, isValidElement, useRef } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

// размеры стрелки из фигмы
const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 6;
// максимальная ширина подсказки по умолчанию; дальше текст переносится
const DEFAULT_MAX_WIDTH = 320;
// сумма отступов от краёв экрана: по 8px с каждой стороны, как VIEWPORT_PADDING в use-popover
const VIEWPORT_GAP = 16;

export interface TooltipProps {
  // элемент, при наведении на который показывается подсказка
  children: ReactElement;
  content: ReactNode;
  placement?: PopoverPlacement;
  // показывать ли стрелку, указывающую на элемент
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  // задержка перед показом, мс
  delay?: number;
  disabled?: boolean;
  // рендерить подсказку в body — нужно, если её обрезает родитель с transform и overflow: hidden
  portal?: boolean;
  // максимальная ширина: число — в px, строка — любое css-значение ('20rem', '50vw', 'none'); на узком экране не шире экрана
  maxWidth?: number | string;
  className?: string;
}

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content,
    placement = 'top',
    arrow = true,
    open: externalOpen,
    defaultOpen = false,
    onOpenChange,
    delay = 200,
    disabled = false,
    portal = false,
    maxWidth = DEFAULT_MAX_WIDTH,
    className,
  } = props;

  const maxWidthValue = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;

  const arrowRef = useRef<SVGSVGElement>(null);

  const popover = usePopover({
    open: externalOpen,
    defaultOpen,
    onOpenChange,
    placement,
    openOn: 'hover',
    hoverDelay: delay,
    offset: arrow ? ARROW_HEIGHT + 2 : 6,
    arrowRef: arrow ? arrowRef : undefined,
    role: 'tooltip',
    disabled,
  });

  // сохраняем собственный ref элемента-триггера, если он был передан
  const triggerRef = useMergeRefs<Element>(
    popover.refs.setReference,
    isValidElement(children) ? (children.props as { ref?: Ref<Element> }).ref : undefined,
  );

  if (!isValidElement(children)) return null;

  const trigger = children as ReactElement<Record<string, unknown>>;

  const tooltip = (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {popover.open && (
          <div
            key='tooltip'
            {...popover.getFloatingProps()}
            ref={popover.refs.setFloating}
            style={popover.floatingStyles}
            className='pbc pbc:z-50'
          >
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15, ease: 'easeOut' } }}
              exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
              className={clsx(
                'pbc pbc:relative pbc:flex pbc:w-max pbc:items-center pbc:px-16 pbc:py-6 pbc:rounded-12 pbc:bg-secondary-400 pbc:shadow-sm pbc:text-text-contrast pbc:wrap-break-word',
                className,
              )}
              style={{
                maxWidth:
                  maxWidthValue === 'none' ? `calc(100vw - ${VIEWPORT_GAP}px)` : `min(${maxWidthValue}, calc(100vw - ${VIEWPORT_GAP}px))`,
              }}
            >
              <Text size={12}>{content}</Text>
              {arrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={popover.context}
                  width={ARROW_WIDTH}
                  height={ARROW_HEIGHT}
                  className='pbc:fill-secondary-400'
                />
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );

  return (
    <>
      {cloneElement(trigger, { ...popover.getReferenceProps(trigger.props), ref: triggerRef })}
      {portal ? <FloatingPortal>{tooltip}</FloatingPortal> : tooltip}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
export default Tooltip;
