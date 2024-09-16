import { ComponentType } from '@/types';
import clsx from 'clsx';

import InlineRadioItem, { Props as InlineRadioItemProps } from '@/components/shared/inline-radio/inline-radio-item';

export type Props<T extends InlineRadioItemProps> = ComponentType & {
  size: 's' | 'm';
  activeValue: string;
  options: T[];
  onChange: (value: T) => void;
};

const InlineRadio = <T extends InlineRadioItemProps>({ className, activeValue, size, options, onChange }: Props<T>) => (
  <div
    className={clsx(
      'pbc pbc-relative pbc-w-max pbc-bg-basic-lighter pbc-p-4',
      size === 's' && 'pbc-rounded-8',
      size === 'm' && 'pbc-rounded-12',
      className,
    )}
  >
    <div className='pbc pbc-gap-4 pbc-inline-flex pbc-w-auto pbc-flex-row pbc-flex-nowrap pbc-items-center pbc-overflow-x-auto'>
      {options.map((item, index) => (
        <InlineRadioItem key={index} {...item} size={size} checked={item.value === activeValue} onClick={() => onChange(item)} />
      ))}
    </div>
  </div>
);

export default InlineRadio;
