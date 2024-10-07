'use client';

import Text from '@/components/helpers/text';
import { ButtonProps } from '@/components/shared/button/button';
import Headline from '@/components/shared/headline';
import { ColorType, DivHTMLAttrs } from '@/types';
import clsx from 'clsx';

type AlertTType = React.ReactElement<ButtonProps>;
type BaseAlertProps<T> = Omit<DivHTMLAttrs, 'children'> & {
  children?: T | T[];
} & ColorType;

export interface AlertProps extends BaseAlertProps<AlertTType> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headline?: string;
  description?: string;
}

const Alert = (props: AlertProps) => {
  const { children, className, headline, description, as = 'h3', color, ...rest } = props;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc-w-full pbc-flex pbc-flex-col pbc-gap-y-16 pbc-px-24 pbc-py-16 pbc-border-1 pbc-border-solid pbc-rounded-8',
        color === 'primary' && 'pbc-border-primary-light pbc-bg-primary-lighter/50',
        color === 'secondary' && 'pbc-border-secondary-lighter pbc-bg-basic-lightest/50',
        color === 'success' && 'pbc-border-success-light pbc-bg-success-lighter/50',
        color === 'danger' && 'pbc-border-danger-light pbc-bg-danger-lighter/50',
        className,
      )}
    >
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
      {children && <div className='pbc pbc-w-full pbc-flex pbc-gap-x-6'>{children}</div>}
    </div>
  );
};

Alert.displayName = 'Alert';

export default Alert;
