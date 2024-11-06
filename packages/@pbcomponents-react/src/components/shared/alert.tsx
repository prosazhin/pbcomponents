'use client';

import Text from '@/components/helpers/text';
import Button, { ButtonProps } from '@/components/shared/button';
import Headline from '@/components/shared/headline';
import { ColorType, DivHTMLAttrs } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

type AlertButtonType = React.ReactElement<ButtonProps>;
type BaseAlertContentProps = DivHTMLAttrs & ColorType;
type BaseAlertProps = Omit<DivHTMLAttrs, 'children'> & ColorType;
type AProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headline?: string;
  description?: string;
};

interface AlertContentProps extends BaseAlertContentProps, AProps {
  buttons?: AlertButtonType | AlertButtonType[];
}

const AlertContent = (props: AlertContentProps) => {
  const { as = 'h3', buttons, headline, description, color, children, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc-w-full pbc-relative pbc-flex pbc-flex-col pbc-gap-y-16 pbc-px-24 pbc-py-16 pbc-border-1 pbc-border-solid pbc-rounded-8 pbc-h-auto',
        color === 'primary' && 'pbc-border-primary-light pbc-bg-primary-lighter/50',
        color === 'secondary' && 'pbc-border-secondary-lighter pbc-bg-basic-lightest/50',
        color === 'success' && 'pbc-border-success-light pbc-bg-success-lighter/50',
        color === 'danger' && 'pbc-border-danger-light pbc-bg-danger-lighter/50',
        className,
      )}
    >
      {children}
      {(headline || description) && (
        <div className='pbc pbc-w-full pbc-flex pbc-flex-col pbc-gap-y-4'>
          {headline && (
            <Headline as={as} className={clsx('pbc-w-full !pbc-text-h20')}>
              {headline}
            </Headline>
          )}
          {description && (
            <Text size='m' className={clsx('pbc-w-full')}>
              {description}
            </Text>
          )}
        </div>
      )}
      {buttons && <div className='pbc pbc-w-full pbc-flex pbc-gap-x-6'>{buttons}</div>}
    </div>
  );
};

export interface AlertProps extends BaseAlertProps, AProps {
  children?: AlertButtonType | AlertButtonType[];
  open?: boolean;
  onClose?: (value: boolean) => void;
}

const Alert = (props: AlertProps) => {
  const { children, className, headline, description, as = 'h3', color, open = true, onClose, ...rest } = props;

  if (!onClose) {
    return (
      <AlertContent
        {...rest}
        className={className}
        headline={headline}
        description={description}
        as={as}
        color={color}
        buttons={children}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AlertContent
              {...rest}
              className={className}
              headline={headline}
              description={description}
              as={as}
              color={color}
              buttons={children}
            >
              <Button
                className='pbc-absolute pbc-top-4 pbc-right-4'
                size='xs'
                theme='ghost'
                color={color}
                leftIcon={XMarkIcon}
                onClick={() => onClose(!open)}
              />
            </AlertContent>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

Alert.displayName = 'Alert';

export default Alert;
