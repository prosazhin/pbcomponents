'use client';

import PopoverPanel, { PopoverPanelSearchProps } from '@/components/helpers/popover-panel';
import Button from '@/components/shared/button';
import PopoverItem from '@/components/shared/popover-item';
import { PopoverContext } from '@/components/shared/popover/context';
import usePopover, { PopoverPlacement } from '@/hooks/use-popover';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Children, HTMLAttributes, ReactElement, ReactNode, Ref, cloneElement, isValidElement, useMemo } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

export interface PopoverProps {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  placement?: PopoverPlacement;
  // рендерить попап в body — нужно, если его обрезает родитель с transform и overflow: hidden
  portal?: boolean;
}

export interface PopoverTriggerProps {
  // элемент, по клику на который открывается попап (например Button)
  children: ReactElement;
  // стрелка справа у Button-триггера, если у кнопки не задан свой rightIcon
  icon?: boolean;
}

export interface PopoverContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
  search?: PopoverPanelSearchProps;
  contentClassName?: string;
}

const PopoverTrigger = (props: PopoverTriggerProps) => {
  void props;

  return null;
};
PopoverTrigger.displayName = 'Popover.Trigger';

const PopoverContent = (props: PopoverContentProps) => {
  void props;

  return null;
};
PopoverContent.displayName = 'Popover.Content';

const Popover = (props: PopoverProps) => {
  const { children, open: externalOpen, defaultOpen, onOpenChange, placement, portal = false } = props;

  const popover = usePopover({ open: externalOpen, defaultOpen, onOpenChange, placement });

  const { setOpen } = popover;
  const contextValue = useMemo(() => ({ close: () => setOpen(false) }), [setOpen]);

  const { triggerElement, contentProps } = useMemo<{
    triggerElement: ReactElement<Record<string, unknown>> | null;
    contentProps: PopoverContentProps | null;
  }>(() => {
    let nextTriggerElement: ReactElement<Record<string, unknown>> | null = null;
    let nextContentProps: PopoverContentProps | null = null;

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;

      if (child.type === PopoverTrigger) {
        const { children: triggerChild, icon = true } = (child as ReactElement<PopoverTriggerProps>).props;

        if (isValidElement(triggerChild)) {
          const element = triggerChild as ReactElement<Record<string, unknown>>;
          const withIcon = icon && element.type === Button && !('rightIcon' in element.props);

          nextTriggerElement = withIcon ? cloneElement(element, { rightIcon: ChevronUpDownIcon }) : element;
        }

        return;
      }

      if (child.type === PopoverContent) {
        nextContentProps = (child as ReactElement<PopoverContentProps>).props;
      }
    });

    return { triggerElement: nextTriggerElement, contentProps: nextContentProps };
  }, [children]);

  // сохраняем собственный ref элемента-триггера, если он был передан
  const triggerRef = useMergeRefs<Element>(popover.refs.setReference, (triggerElement?.props as { ref?: Ref<Element> } | undefined)?.ref);

  const { children: contentChildren, search, className, contentClassName, ...contentRest } = contentProps ?? {};

  return (
    <>
      {triggerElement &&
        cloneElement(triggerElement, {
          ...popover.getReferenceProps(triggerElement.props),
          ref: triggerRef,
        })}
      <PopoverContext.Provider value={contextValue}>
        <PopoverPanel
          {...popover.getFloatingProps(contentRest)}
          ref={popover.refs.setFloating}
          context={popover.context}
          floatingStyles={popover.floatingStyles}
          open={popover.open}
          side={popover.side}
          search={search}
          portal={portal}
          className={className}
          contentClassName={contentClassName}
        >
          {contentChildren}
        </PopoverPanel>
      </PopoverContext.Provider>
    </>
  );
};

Popover.displayName = 'Popover';

const PopoverCompound: typeof Popover & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
  Item: typeof PopoverItem;
} = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Item: PopoverItem,
});

export default PopoverCompound;
