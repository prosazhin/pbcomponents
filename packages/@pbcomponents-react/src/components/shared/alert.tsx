'use client';

import Text from '@/components/helpers/text';
import Button, { ButtonProps } from '@/components/shared/button';
import Headline from '@/components/shared/headline';
import { ColorType, DivHTMLAttrs } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';

type AlertButtonType = React.ReactElement<ButtonProps>;
type BaseAlertProps = Omit<DivHTMLAttrs, 'children'> & ColorType;
export interface AlertProps extends BaseAlertProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headline?: string;
  description?: string;
  children?: AlertButtonType | AlertButtonType[];
  open?: boolean;
  initialOpacity?: number;
  initialHeight?: 0 | 'auto';
  onClose?: (value: boolean) => void;
}

const Alert = (props: AlertProps) => {
  const {
    children,
    className,
    headline,
    description,
    as = 'h3',
    color = 'primary',
    open = true,
    initialOpacity = 0,
    initialHeight = 0,
    onClose,
    ...rest
  } = props;
  const opacity = onClose ? initialOpacity : 1;
  const height = onClose ? initialHeight : 'auto';

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={{ opacity, height }}
            animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } }}
            exit={{ opacity, height, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <div
              {...rest}
              className={clsx(
                'pbc pbc:w-full pbc:relative pbc:flex pbc:flex-col pbc:gap-y-16 pbc:px-24 pbc:py-16 pbc:border-1 pbc:border-solid pbc:rounded-8 pbc:h-auto',
                color === 'primary' && 'pbc:border-primary-light pbc:bg-primary-lighter/50',
                color === 'secondary' && 'pbc:border-secondary-lighter pbc:bg-basic-lightest/50',
                color === 'success' && 'pbc:border-success-light pbc:bg-success-lighter/50',
                color === 'danger' && 'pbc:border-danger-light pbc:bg-danger-lighter/50',
                className,
              )}
            >
              {onClose && (
                <Button
                  className='pbc:absolute pbc:top-4 pbc:right-4 pbc:!w-auto'
                  size='xs'
                  theme='ghost'
                  color={color}
                  leftIcon={XMarkIcon}
                  onClick={() => onClose(!open)}
                />
              )}
              {(headline || description) && (
                <div className='pbc pbc:w-full pbc:flex pbc:flex-col pbc:gap-y-4'>
                  {headline && (
                    <Headline as={as} className={clsx('pbc:w-full pbc:!text-h20')}>
                      {headline}
                    </Headline>
                  )}
                  {description && (
                    <Text size='m' className={clsx('pbc:w-full')}>
                      {description}
                    </Text>
                  )}
                </div>
              )}
              {children && <div className='pbc pbc:w-full pbc:flex pbc:gap-x-6'>{children}</div>}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

Alert.displayName = 'Alert';

export default Alert;
