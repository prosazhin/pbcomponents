import { PolymorphicComponentPropsWithRef } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  {
    size: 's' | 'm';
    checked?: boolean | never;
    disabled?: boolean | never;
    onChange: (value: boolean) => void;
  }
>;

const InlineRadioItem = <T extends React.ElementType = 'input'>({
  className,
  label,
  checked = false,
  onChange,
  size,
  disabled,
  ...rest
}: Props<T>) => (
  <label
    className={clsx(
      'relative inline-flex w-max cursor-pointer flex-nowrap items-center justify-center rounded-full transition-colors before:absolute before:h-full before:w-full before:rounded-full before:transition-colors',
      // isActive ? 'text-primary-main hover:bg-white' : 'text-basic-main',
      size === 's' && 'space-x-[6px]',
      size === 'm' && 'space-x-[8px]',
      className,
    )}
    {...rest}
  >
    <input
      type='radio'
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
      className={clsx(
        'pbc pbc-relative pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
        'pbc-rounded-999 pbc-border-secondary-light hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
        'checked:pbc-bg-primary-main checked:pbc-border-transparent hover:checked:pbc-bg-primary-darker disabled:checked:pbc-bg-primary-light disabled:checked:pbc-border-transparent hover:disabled:checked:pbc-bg-primary-light',
        'before:pbc-absolute before:pbc-bg-transparent before:pbc-rounded-999 checked:before:pbc-bg-white before:pbc-inset-0 before:pbc-m-auto',
        size === 's' && 'pbc-size-16 before:pbc-size-6',
        size === 'm' && 'pbc-size-24 before:pbc-size-10',
      )}
      {...rest}
    />
    <Content size={size} medium={true}>
      {label}
    </Content>
  </label>
);

export default InlineRadioItem;
