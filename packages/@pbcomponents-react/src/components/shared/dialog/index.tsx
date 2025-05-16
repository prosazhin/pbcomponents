'use client';

import Button from '@/components/shared/button';
import { DivHTMLAttrs, DivType } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import useDebounce from '@/hooks/use-debounce';
import useKeydown from '@/hooks/use-keydown';

type BaseDialogProps = Omit<DivHTMLAttrs, 'onClose' | 'id'>;
export interface DialogProps extends BaseDialogProps {
  id: string;
  open?: boolean;
  backdrop?: boolean;
  onClose?: (value: boolean, id?: string) => void;
}

const Dialog = (props: DialogProps) => {
  const { open: defaultOpen = false, onClose = () => {}, backdrop = true, children, className, id } = props;
  const dialogRef = useRef<DivType>(null);
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const animationDuration = 200;
  const isTouchDevice = 'ontouchstart' in document.documentElement;

  useEffect(() => {
    if (defaultOpen !== open) {
      setOpen(defaultOpen);
    }
  }, [defaultOpen]);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.touchAction = 'none';
      if (!isTouchDevice) {
        document.documentElement.style.paddingRight = '15px';
      }
    }
  }, [open]);

  useDebounce(!open, animationDuration, () => {
    onClose(false, id);
    document.documentElement.style.overflow = '';
    document.documentElement.style.touchAction = '';
    if (!isTouchDevice) {
      document.documentElement.style.paddingRight = '';
    }
  });

  useClickOutside([dialogRef], () => setOpen(false));
  useKeydown(['Escape'], () => setOpen(false));

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            className='pbc:fixed pbc:size-full pbc:-z-1 pbc:inset-0 pbc:m-auto pbc:p-0 pbc:flex pbc:pointer-events-none pbc:desktop:items-center pbc:items-end pbc:justify-end pbc:desktop:justify-center'
            initial={{ zIndex: -1 }}
            animate={{ zIndex: 500, transition: { duration: (animationDuration + 100) / 1000, ease: 'easeIn' } }}
            exit={{ zIndex: -1, transition: { duration: animationDuration / 1000, ease: 'easeOut' } }}
          >
            <m.div
              ref={dialogRef}
              id={id}
              key={id}
              className={clsx(
                'pbc pbc:pt-0 pbc:px-0 pbc:z-10 pbc:mx-auto pbc:desktop:m-auto pbc:box-border pbc:pointer-events-auto',
                'pbc:w-full pbc:desktop:w-736 pbc:max-w-full pbc:max-h-[calc(100dvh-40px)] pbc:desktop:max-h-[calc(100dvh-160px)]',
                'pbc-scrollbar-hidden pbc:overflow-x-hidden pbc:overflow-y-auto pbc:flex pbc:flex-col pbc:pb-40 pbc:desktop:pb-80',
                'pbc:bg-white pbc:rounded-t-16 pbc:desktop:rounded-16 pbc:shadow-xxxxl pbc:border-1 pbc:border-solid pbc:border-secondary-lighter',
                className,
              )}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0, transition: { duration: (animationDuration + 100) / 1000, ease: 'easeIn' } }}
              exit={{ opacity: 0, y: '100%', transition: { duration: animationDuration / 1000, ease: 'easeOut' } }}
            >
              <div className='pbc:sticky pbc:top-0 pbc:px-8 pbc:pt-8 pbc:z-10 pbc:flex pbc:justify-end pbc:bg-white'>
                <Button
                  size='m'
                  theme='ghost'
                  color='secondary'
                  leftIcon={XMarkIcon}
                  autoFocus={false}
                  className='pbc:!w-auto'
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className='pbc:px-24 pbc:pt-8 pbc:desktop:px-80 pbc:desktop:pt-24'>{children}</div>
            </m.div>
            {backdrop && (
              <m.div
                className='pbc:absolute pbc:size-full pbc:inset-0 pbc:bg-basic-main/50 pbc:z-1 pbc:pointer-events-auto'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: (animationDuration + 100) / 1000, ease: 'easeIn' } }}
                exit={{ opacity: 0, transition: { duration: animationDuration / 1000, ease: 'easeOut' } }}
              />
            )}
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;
