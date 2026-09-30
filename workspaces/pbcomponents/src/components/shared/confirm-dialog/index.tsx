'use client';

import Text from '@/components/helpers/text';
import Button from '@/components/shared/button';
import Dialog, { DialogTriggerProps } from '@/components/shared/dialog';
import Headline from '@/components/shared/headline';
import useControllableState from '@/hooks/use-controllable-state';
import { ReactNode } from 'react';

export interface ConfirmDialogProps {
  id: string;
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
  // кнопка, открывающая диалог; если не передана — диалогом управляют через open
  trigger?: DialogTriggerProps;
  className?: string;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    id,
    title,
    description,
    color = 'primary',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    open: externalOpen,
    defaultOpen = false,
    onOpenChange,
    trigger,
    className,
  } = props;

  const [open = false, setOpen] = useControllableState<boolean>({
    value: externalOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <Dialog id={id} open={open} onOpenChange={(value) => setOpen(value)} className={className}>
      {trigger && <Dialog.Trigger {...trigger} />}
      <Dialog.Body>
        <div className='pbc pbc:flex pbc:w-full pbc:flex-col pbc:gap-24'>
          <div className='pbc pbc:flex pbc:w-full pbc:flex-col pbc:gap-8'>
            <Headline as='h5' className='pbc:text-text-primary'>
              {title}
            </Headline>
            {description && (
              <Text as='p' size={16} className='pbc:w-full pbc:m-0 pbc:text-text-secondary'>
                {description}
              </Text>
            )}
          </div>
          <div className='pbc pbc:flex pbc:w-full pbc:gap-8'>
            <Button
              color={color}
              className='pbc:w-auto!'
              onClick={() => {
                onConfirm?.();
                setOpen(false);
              }}
            >
              {confirmText}
            </Button>
            <Button
              theme='border'
              color='secondary'
              className='pbc:w-auto!'
              onClick={() => {
                onCancel?.();
                setOpen(false);
              }}
            >
              {cancelText}
            </Button>
          </div>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';
export default ConfirmDialog;
