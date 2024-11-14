'use client';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';
import { DialogHTMLAttrs, DialogType, SvgType } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import useDebounce from '@/hooks/use-debounce';
import useKeydown from '@/hooks/use-keydown';

type BaseNotificationProps = Omit<DialogHTMLAttrs, 'onClose'>;

export interface NotificationProps extends BaseNotificationProps {
  icon?: SvgType | never;
  iconClassName?: string;
  headline: string;
  description?: string;
  open?: boolean;
  delay?: number;
  top?: number;
  onClose?: (value: boolean) => void;
}

const Notification = (props: NotificationProps) => {
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
  } = props;
  const ref = useRef<DialogType>(null);
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [isMouseInside, setIsMouseInside] = useState<boolean>(false);

  useEffect(() => {
    if (defaultOpen !== open) {
      setOpen(defaultOpen);
    }
  }, [defaultOpen]);

  useEffect(() => {
    if (open) {
      ref.current?.show();
    } else {
      ref.current?.close();
      onClose(false);
    }
  }, [open]);

  useDebounce(open && !isMouseInside, delay, () => setOpen(false));
  useKeydown(['Escape'], () => setOpen(false));

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.dialog
            ref={ref}
            open={open}
            className={clsx(
              'pbc pbc-notification-mobile desktop:pbc-notification-desktop pbc-z-[999] pbc-cursor-pointer pbc-group',
              'pbc-border-1 pbc-border-solid pbc-rounded-8 pbc-w-[calc(100%-32px)] desktop:pbc-w-400 pbc-m-auto pbc-px-24 pbc-py-16',
              'pbc-transition pbc-border-secondary-lighter hover:pbc-border-primary-main pbc-bg-white',
              'pbc-shadow-lg hover:pbc-shadow-xxl pbc-flex pbc-flex-row pbc-gap-x-16 pbc-items-center',
              className,
            )}
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setIsMouseInside(true)}
            onMouseLeave={() => setIsMouseInside(false)}
            initial={{ opacity: 0, top: top + 8 }}
            animate={{ opacity: 1, top, transition: { duration: 0.2, ease: 'easeIn' } }}
            exit={{ opacity: 0, top: top + 8, transition: { duration: 0.2, ease: 'easeOut' } }}
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
            <Icon
              tag={XMarkIcon}
              size='l'
              className={clsx(
                'pbc-text-basic-main pbc-pointer-events-none pbc-select-none group-hover:pbc-text-primary-darker pbc-transition-colors',
              )}
            />
          </m.dialog>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

Notification.displayName = 'Notification';

export default Notification;
