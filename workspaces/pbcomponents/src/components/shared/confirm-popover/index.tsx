'use client';

import PopoverPanel from '@/components/helpers/popover-panel';
import Text from '@/components/helpers/text';
import Button from '@/components/shared/button';
import Headline from '@/components/shared/headline';
import usePopover, { PopoverPlacement } from '@/hooks/use-popover';
import { ReactElement, ReactNode, Ref, cloneElement, isValidElement } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

export interface ConfirmPopoverProps {
  // элемент, по клику на который открывается подтверждение (например Button)
  children: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  color?: 'primary' | 'danger';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  placement?: PopoverPlacement;
  portal?: boolean;
  className?: string;
}

const ConfirmPopover = (props: ConfirmPopoverProps) => {
  const {
    children,
    title,
    description,
    color = 'primary',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    open: externalOpen,
    defaultOpen,
    onOpenChange,
    placement,
    portal = false,
    className,
  } = props;

  const popover = usePopover({ open: externalOpen, defaultOpen, onOpenChange, placement, role: 'dialog' });

  // сохраняем собственный ref элемента-триггера, если он был передан
  const triggerRef = useMergeRefs<Element>(
    popover.refs.setReference,
    isValidElement(children) ? (children.props as { ref?: Ref<Element> }).ref : undefined,
  );

  if (!isValidElement(children)) return null;

  const trigger = children as ReactElement<Record<string, unknown>>;

  return (
    <>
      {cloneElement(trigger, { ...popover.getReferenceProps(trigger.props), ref: triggerRef })}
      <PopoverPanel
        {...popover.getFloatingProps()}
        ref={popover.refs.setFloating}
        context={popover.context}
        floatingStyles={popover.floatingStyles}
        open={popover.open}
        side={popover.side}
        portal={portal}
        className={className}
        contentClassName='pbc:flex pbc:flex-col pbc:gap-20 pbc:px-24! pbc:py-16'
      >
        <div className='pbc pbc:flex pbc:w-full pbc:flex-col pbc:gap-4'>
          <Headline as='h6' className='pbc:text-text-primary'>
            {title}
          </Headline>
          {description && (
            <Text as='p' size={12} className='pbc:w-full pbc:m-0 pbc:text-text-secondary'>
              {description}
            </Text>
          )}
        </div>
        <div className='pbc pbc:flex pbc:w-full pbc:gap-8'>
          <Button
            size='s'
            color={color}
            className='pbc:w-auto!'
            onClick={() => {
              onConfirm?.();
              popover.setOpen(false);
            }}
          >
            {confirmText}
          </Button>
          <Button
            size='s'
            theme='border'
            color='secondary'
            className='pbc:w-auto!'
            onClick={() => {
              onCancel?.();
              popover.setOpen(false);
            }}
          >
            {cancelText}
          </Button>
        </div>
      </PopoverPanel>
    </>
  );
};

ConfirmPopover.displayName = 'ConfirmPopover';
export default ConfirmPopover;
