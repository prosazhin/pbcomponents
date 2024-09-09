import { useRef } from 'react';

import { PolymorphicComponentPropsWithRef } from '@/types';
import clsx from 'clsx';

export type Props<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  {
    labelPlace: 'left' | 'right';
    size: 's' | 'm';
    checked: boolean;
    indeterminate?: boolean | never;
    disabled?: boolean | never;
    setChecked: (value: boolean) => void;
  }
>;

const sizes = {
  s: 'w-4 h-4 rounded-full text-tm4',
  m: 'w-6 h-6 rounded-full text-tm3',
};

export const Radio = <T extends React.ElementType = 'input'>({
  className,
  name,
  value,
  checked,
  onChange,
  size,
  disabled = false,
}: Props<T>) => {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx('radio', className)}>
      <input
        type='radio'
        ref={input}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={clsx(
          'border-secondary-light checked:bg-primary-main hover:checked:bg-primary-darker cursor-pointer rounded-full border-solid outline-none',
          { 'border-secondary-light disabled:border-solid': disabled },
          { 'disabled:bg-basic-lighter border-secondary-light border-solid': disabled && checked },
          sizes[size],
        )}
      />
    </div>
  );
};

export default Radio;
