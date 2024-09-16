import { PolymorphicComponentPropsWithRef } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props<T extends React.ElementType = 'input'> = PolymorphicComponentPropsWithRef<
  T,
  {
    labelPlace: 'left' | 'right';
    size: 's' | 'm';
    checked?: boolean | never;
    disabled?: boolean | never;
    onChange: (value: boolean) => void;
  }
>;

export const Radio = <T extends React.ElementType = 'input'>({
  className,
  labelPlace = 'right',
  label,
  checked = false,
  onChange,
  size,
  disabled,
  ...rest
}: Props<T>) => (
  <label
    className={clsx(
      'pbc pbc-inline-flex pbc-w-max pbc-cursor-pointer pbc-flex-nowrap pbc-gap-x-8',
      disabled && '!pbc-cursor-default',
      className,
    )}
  >
    <input
      type='radio'
      checked={checked}
      disabled={disabled}
      className={clsx(
        'pbc pbc-relative pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
        'pbc-rounded-999 pbc-border-secondary-light hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
        'checked:pbc-bg-primary-main checked:pbc-border-transparent hover:checked:pbc-bg-primary-darker disabled:checked:pbc-bg-primary-light disabled:checked:pbc-border-transparent hover:disabled:checked:pbc-bg-primary-light',
        'before:pbc-absolute before:pbc-bg-transparent before:pbc-rounded-999 checked:before:pbc-bg-white before:pbc-inset-0 before:pbc-m-auto',
        size === 's' && 'pbc-size-16 before:pbc-size-6',
        size === 'm' && 'pbc-size-24 before:pbc-size-10',
      )}
      {...rest}
      onChange={(event) => onChange(event.target.checked)}
    />
    {label && (
      <Content
        className={clsx(
          'pbc-flex-1 pbc-transition-colors',
          labelPlace === 'left' && 'pbc-order-first',
          labelPlace === 'right' && 'pbc-order-last',
          disabled ? 'pbc-text-basic-light' : 'pbc-text-basic-main',
        )}
        size={size}
      >
        {label}
      </Content>
    )}
  </label>
);

export default Radio;
