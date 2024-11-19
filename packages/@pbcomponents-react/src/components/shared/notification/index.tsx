'use client';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';
import { DialogHTMLAttrs, DialogType, SvgType } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState } from 'react';

import useDebounce from '@/hooks/use-debounce';
import useKeydown from '@/hooks/use-keydown';

type BaseNotificationProps = Omit<DialogHTMLAttrs, 'onClose'>;
export interface NotificationProps extends BaseNotificationProps {
  icon?: SvgType | never;
  iconClassName?: string;
  headline: string;
  description?: React.ReactNode;
  open?: boolean;
  delay?: number;
  top?: number;
  onClose?: (value: boolean, id?: string) => void;
}

const Notification = forwardRef<DialogType, NotificationProps>((props, ref) => {
  const {
    headline,
    description,
    open: defaultOpen = false,
    delay = 3000,
    top = 0,
    onClose = () => {},
    icon,
    iconClassName,
    className,
    ...rest
  } = props;
  const internalRef = useRef<DialogType>(null);
  const dialogRef = (ref || internalRef) as React.MutableRefObject<DialogType>;
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [isMouseInside, setIsMouseInside] = useState<boolean>(false);
  const animationDuration = 200;
  const { id } = rest;

  useEffect(() => {
    if (defaultOpen !== open) {
      setOpen(defaultOpen);
    }
  }, [defaultOpen]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.show();
    }
  }, [open]);

  useDebounce(!open, animationDuration, () => {
    dialogRef.current?.close();
    onClose(false, id);
  });

  useDebounce(open && !isMouseInside, delay, () => setOpen(false));
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
              'pbc pbc-notification-mobile desktop:pbc-notification-desktop pbc-z-[999] pbc-cursor-default pbc-group pbc-pointer-events-auto pbc-overflow-hidden',
              'pbc-border-1 pbc-border-solid pbc-rounded-8 pbc-w-[calc(100%-32px)] desktop:pbc-w-400 pbc-min-h-80 pbc-m-auto pbc-px-24 pbc-py-16',
              'pbc-border-secondary-lighter pbc-bg-white pbc-flex pbc-flex-row pbc-gap-x-16 pbc-items-center',
              'pbc-shadow-sm hover:pbc-shadow-xxl pbc-transition-shadow',
              className,
            )}
            onMouseEnter={() => setIsMouseInside(true)}
            onMouseLeave={() => setIsMouseInside(false)}
            initial={{ opacity: 0, scale: 0.95, top, x: 40 }}
            animate={{ opacity: 1, scale: 1, top, x: 0, transition: { duration: animationDuration / 1000, ease: 'easeIn' } }}
            exit={{ opacity: 0, scale: 0.95, top, x: 40, transition: { duration: animationDuration / 1000, ease: 'easeOut' } }}
          >
            {icon && (
              <Icon
                tag={icon}
                size='l'
                className={clsx('pbc-size-32 pbc-pointer-events-none pbc-select-none pbc-text-basic-light', iconClassName)}
              />
            )}
            <div className='pbc-flex pbc-flex-col pbc-w-full pbc-gap-y-4'>
              <Text size='m' medium className={clsx('pbc-w-full pbc-text-basic-main')}>
                {headline}
              </Text>
              {description && (
                <Text size='s' className={clsx('pbc-w-full pbc-text-basic-light')}>
                  {description}
                </Text>
              )}
            </div>
            <button
              className='pbc-cursor-pointer !pbc-bg-transparent pbc-h-48 pbc-p-0 pbc-m-0'
              type='button'
              onClick={() => setOpen(false)}
            >
              <Icon
                tag={XMarkIcon}
                size='l'
                className={clsx(
                  'pbc-text-basic-main pbc-pointer-events-none pbc-select-none group-hover:pbc-text-primary-darker pbc-transition-colors',
                )}
              />
            </button>
            {!isMouseInside && open && (
              <m.div
                className='pbc-absolute pbc-h-2 pbc-bottom-0 pbc-inset-x-0 pbc-m-auto pbc-w-full pbc-bg-primary-main'
                initial={{ opacity: 1, x: '-100%' }}
                animate={{ opacity: 1, x: 0, transition: { duration: delay / 1000, ease: 'easeIn' } }}
                exit={{ opacity: 0, x: '-100%', transition: { duration: 0.05 } }}
              />
            )}
          </m.dialog>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});

Notification.displayName = 'Notification';

export default Notification;
