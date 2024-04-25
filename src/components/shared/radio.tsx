import { ChangeEvent, useRef } from 'react';

import { DefaultPropsType } from '@/types';
import clsx from 'clsx';

export type Props<T = string, E = HTMLInputElement> = DefaultPropsType<{
  size: 's' | 'm';
  disabled?: boolean;
  name: string;
  value?: T;
  checked: boolean;
  onChange?: (event: ChangeEvent<E>) => void;
}>;

const sizes = {
  s: 'w-4 h-4 rounded-full text-tm4',
  m: 'w-6 h-6 rounded-full text-tm3',
};

export const Radio = ({ className, name, value, checked, onChange, size, disabled = false }: Props) => {
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
          'border-solid border-secondary-light cursor-pointer rounded-full checked:bg-primary-main hover:checked:bg-primary-darker outline-none',
          { 'disabled:border-solid border-secondary-light': disabled },
          { 'disabled:bg-basic-lighter border-solid border-secondary-light': disabled && checked },
          sizes[size],
        )}
      />
    </div>
  );
};

export default Radio;
