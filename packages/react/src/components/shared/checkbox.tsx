import { useEffect, useRef } from 'react';

import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';

import { PolymorphicComponentPropsWithRef } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';
import Icon from '@/components/helpers/icon';

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

export const Checkbox = <T extends React.ElementType = 'input'>({
  className,
  labelPlace = 'right',
  size,
  checked,
  indeterminate,
  label,
  disabled,
  setChecked,
}: Props<T>) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  let IconIcon = CheckIcon;

  if (indeterminate) {
    IconIcon = MinusIcon;
  }

  return (
    <label
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max pbc-cursor-pointer pbc-flex-nowrap pbc-gap-x-8 pbc-transition-colors',
        disabled && '!pbc-cursor-default',
        className,
      )}
    >
      <div className={clsx('pbc-relative', size === 's' && 'pbc-size-16', size === 'm' && 'pbc-size-24')}>
        <input
          type='checkbox'
          ref={input}
          checked={checked}
          disabled={disabled}
          className={clsx(
            'pbc-cursor-pointer pbc-appearance-none pbc-transition-colors focus:pbc-ring-0 focus:pbc-ring-offset-0 pbc-outline-primary !pbc-m-0',
            'pbc-rounded-4 pbc-border-secondary-light hover:pbc-border-primary-main pbc-border-1 pbc-border-solid',
            'disabled:!pbc-cursor-default disabled:pbc-bg-basic-lighter disabled:pbc-border-secondary-light hover:disabled:pbc-border-secondary-light hover:disabled:pbc-bg-basic-lighter',
            'checked:pbc-bg-primary-main checked:pbc-border-transparent hover:checked:pbc-bg-primary-darker disabled:checked:pbc-bg-primary-light disabled:checked:pbc-border-transparent hover:disabled:checked:pbc-bg-primary-light',
            'indeterminate:pbc-bg-primary-main indeterminate:pbc-border-transparent hover:indeterminate:pbc-bg-primary-darker disabled:indeterminate:pbc-bg-primary-light disabled:indeterminate:pbc-border-transparent hover:disabled:indeterminate:pbc-bg-primary-light',
            size === 's' && 'pbc-size-16',
            size === 'm' && 'pbc-size-24',
          )}
          onChange={(event) => setChecked(event.target.checked)}
        />
        {(checked || indeterminate) && <Icon tag={IconIcon} size={size} className='pbc-absolute pbc-top-0 pbc-left-0 pbc-text-white' />}
      </div>
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
};

export default Checkbox;
