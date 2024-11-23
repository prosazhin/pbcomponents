'use client';

import Button from '@/components/shared/button';
import { DialogHTMLAttrs, DialogType } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import useDebounce from '@/hooks/use-debounce';
import useKeydown from '@/hooks/use-keydown';

type BaseDialogProps = Omit<DialogHTMLAttrs, 'onClose'>;
export interface DialogProps extends BaseDialogProps {
  open?: boolean;
  onClose?: (value: boolean, id?: string) => void;
}

const Dialog = forwardRef<DialogType, DialogProps>((props, ref) => {
  const { open: defaultOpen = false, onClose = () => {}, children, className, ...rest } = props;
  const internalRef = useRef<DialogType>(null);
  const dialogRef = (ref || internalRef) as React.MutableRefObject<DialogType>;
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const animationDuration = 200;
  const { id } = rest;

  useEffect(() => {
    if (defaultOpen !== open) {
      setOpen(defaultOpen);
    }
  }, [defaultOpen]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.removeAttribute('open');
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      dialogRef.current?.classList.add('backdrop:!pbc-animate-hide');
    }
  }, [open]);

  useDebounce(!open, animationDuration, () => {
    dialogRef.current?.close();
    onClose(false, id);
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  });

  useClickOutside([dialogRef], () => setOpen(false));
  useKeydown(['Escape'], () => setOpen(false));

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.dialog
            ref={dialogRef}
            id={id}
            open={open}
            className={clsx(
              'pbc pbc-dialog pbc-dialog-mobile desktop:pbc-dialog-desktop pbc-pt-0 pbc-px-0 pbc-z-[999] pbc-m-auto pbc-box-border',
              'pbc-w-full desktop:pbc-w-736 pbc-max-w-full pbc-max-h-[calc(100vh-40px)] desktop:pbc-max-h-[calc(100vh-160px)]',
              'pbc-scrollbar-hidden pbc-overflow-x-hidden pbc-overflow-y-auto pbc-flex pbc-flex-col pbc-pb-40 desktop:pbc-pb-80',
              'pbc-bg-white pbc-rounded-t-16 desktop:pbc-rounded-16 pbc-shadow-xxxxl pbc-border-1 pbc-border-solid pbc-border-secondary-lighter',
              'backdrop:!pbc-appearance-none backdrop:pbc-pointer-events-none backdrop:pbc-bg-basic-main/50 backdrop:pbc-animate-show',
              className,
            )}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0, transition: { duration: (animationDuration + 100) / 1000, ease: 'easeIn' } }}
            exit={{ opacity: 0, y: '100%', transition: { duration: animationDuration / 1000, ease: 'easeOut' } }}
          >
            <div className='pbc-sticky pbc-top-0 pbc-px-8 pbc-pt-8 pbc-z-10 pbc-flex pbc-justify-end pbc-bg-white'>
              <Button
                size='m'
                theme='ghost'
                color='secondary'
                leftIcon={XMarkIcon}
                autoFocus={false}
                className='!pbc-w-auto'
                onClick={() => setOpen(false)}
              />
            </div>
            <div className='pbc-px-24 pbc-pt-8 desktop:pbc-px-80 desktop:pbc-pt-24'>{children}</div>
          </m.dialog>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;
