import {
  Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { RefObject } from 'react';

import useControllableState from '@/hooks/use-controllable-state';

export type PopoverPlacement = Placement;

export interface UsePopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  placement?: PopoverPlacement;
  // как открывается попап: по клику на триггер, по наведению и фокусу (подсказка) или только снаружи через open
  openOn?: 'click' | 'hover' | 'manual';
  // задержка перед открытием по наведению, мс
  hoverDelay?: number;
  // отступ от триггера; по умолчанию 6px, как в фигме
  offset?: number;
  // растянуть попап на ширину триггера (для Select и Search)
  matchTriggerWidth?: boolean;
  // стрелка, указывающая на триггер (у Tooltip)
  arrowRef?: RefObject<Element | null>;
  role?: 'dialog' | 'menu' | 'listbox' | 'tooltip';
  disabled?: boolean;
}

// отступ от края экрана, ближе которого попап не подходит
const VIEWPORT_PADDING = 8;

export default function usePopover(props: UsePopoverProps = {}) {
  const {
    open: externalOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    openOn = 'click',
    hoverDelay = 200,
    offset: offsetValue = 6,
    matchTriggerWidth = false,
    arrowRef,
    role = 'dialog',
    disabled = false,
  } = props;

  const [open = false, setOpen] = useControllableState<boolean>({
    value: externalOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const {
    refs,
    floatingStyles,
    context,
    placement: resolvedPlacement,
  } = useFloating({
    open: open && !disabled,
    // у задизейбленного попапа клик и наведение не должны менять состояние: иначе он откроется сам, как только disabled снимут
    onOpenChange: (value) => {
      if (disabled && value) return;
      setOpen(value);
    },
    placement,
    // fixed-позиционирование не даёт родителю с overflow: hidden обрезать попап
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({ padding: VIEWPORT_PADDING }),
      shift({ padding: VIEWPORT_PADDING }),
      size({
        padding: VIEWPORT_PADDING,
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(availableHeight, 120)}px`,
            ...(matchTriggerWidth ? { width: `${rects.reference.width}px` } : {}),
          });
        },
      }),
      arrowRef && arrow({ element: arrowRef, padding: 12 }),
    ],
  });

  const click = useClick(context, { enabled: openOn === 'click' && !disabled });
  const hover = useHover(context, { enabled: openOn === 'hover' && !disabled, delay: { open: hoverDelay, close: 0 }, move: false });
  const focus = useFocus(context, { enabled: openOn === 'hover' && !disabled });
  const dismiss = useDismiss(context);
  const roleProps = useRole(context, { role });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, focus, dismiss, roleProps]);

  return {
    open: open && !disabled,
    setOpen,
    refs,
    context,
    floatingStyles,
    // сторона, с которой попап оказался после flip — от неё зависит направление анимации
    side: resolvedPlacement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left',
    getReferenceProps,
    getFloatingProps,
  };
}
