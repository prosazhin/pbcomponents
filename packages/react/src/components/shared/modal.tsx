'use client';

import Button from '@/components/shared/button';
import { DivHTMLAttrs } from '@/types';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';

type BaseDialogProps = DivHTMLAttrs;

export interface DialogProps extends BaseDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const Modal = (props: DialogProps) => {
  const { children, open, onClose } = props;

  const handleWindowKeyDown = useCallback(
    (e: { key: string }) => {
      if (e.key === 'Escape') {
        onClose(false);
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener('keydown', handleWindowKeyDown);

    return () => window.removeEventListener('keydown', handleWindowKeyDown);
  }, [handleWindowKeyDown]);

  return (
    <Dialog
      as='div'
      open={open}
      className={clsx(
        'pbc pbc-fixed pbc-inset-0 pbc-m-auto pbc-w-screen pbc-h-screen pbc-overflow-hidden',
        'pbc-flex pbc-flex-col pbc-items-end pbc-justify-end desktop:pbc-items-center desktop:pbc-justify-center',
        'pbc-pt-40 desktop:pbc-py-80 pbc-z-50',
      )}
      role='dialog'
      transition
      unmount
      onClose={() => onClose(false)}
    >
      <DialogBackdrop
        as='div'
        transition
        className={clsx(
          'pbc-fixed pbc-size-full pbc-inset-0 pbc-bg-basic-main/50 data-[closed]:pbc-opacity-0',
          'data-[enter]:pbc-duration-300 data-[enter]:pbc-ease-out data-[leave]:pbc-duration-200 data-[leave]:pbc-ease-in',
        )}
      />
      <DialogPanel
        as='div'
        transition
        className={clsx(
          'pbc-bg-white pbc-relative pbc-rounded-t-16 desktop:pbc-rounded-16 pbc-shadow-xxxxl',
          'pbc-mb-0 pbc-mx-auto desktop:pbc-m-auto pbc-h-auto pbc-max-h-full pbc-w-full desktop:pbc-w-736',
          'pbc-scrollbar-hidden pbc-overflow-x-hidden pbc-overflow-y-auto data-[closed]:pbc-opacity-0 data-[closed]:pbc-translate-y-full',
          'data-[enter]:pbc-duration-300 data-[enter]:pbc-ease-out data-[leave]:pbc-duration-200 data-[leave]:pbc-ease-in',
        )}
      >
        <div className='pbc-sticky pbc-top-0 pbc-px-8 pbc-pt-8 pbc-z-20 pbc-flex pbc-justify-end pbc-bg-white'>
          <Button size='m' theme='ghost' color='secondary' leftIcon={XMarkIcon} onClick={() => onClose(false)} />
        </div>
        <div className='pbc-px-24 pbc-pb-40 pbc-pt-8 desktop:pbc-px-80 desktop:pbc-pb-80 desktop:pbc-pt-24'>{children}</div>
      </DialogPanel>
    </Dialog>
  );
};

Modal.displayName = 'Modal';

export default Modal;
