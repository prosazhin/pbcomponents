'use client';

import InlineRadioItem, { InlineRadioItemProps } from '@/components/shared/inline-radio/inline-radio-item';
import { ComponentWrapperType, DivType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

export interface InlineRadioProps<T> extends ComponentWrapperType<T>, SMSizeType {
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InlineRadio = forwardRef<DivType, InlineRadioProps<React.ReactElement<InlineRadioItemProps>>>((props, ref) => {
  const { children, className, defaultValue, size, onChange, ...rest } = props;
  const [activeValue, setActiveValue] = useState<string | undefined>(defaultValue);

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc-relative pbc-w-max pbc-bg-basic-lighter pbc-p-4',
        size === 's' && 'pbc-rounded-8',
        size === 'm' && 'pbc-rounded-12',
        className,
      )}
    >
      <div className='pbc pbc-gap-4 pbc-inline-flex pbc-w-auto pbc-flex-row pbc-flex-nowrap pbc-items-center pbc-overflow-x-auto'>
        {children &&
          children.map(({ props: itemProps }, index) => (
            <InlineRadioItem
              {...itemProps}
              key={index}
              size={size}
              checked={activeValue === itemProps.value}
              onChange={(value, event) => {
                setActiveValue(value);
                if (onChange) onChange(value, event);
              }}
            />
          ))}
      </div>
    </div>
  );
});

InlineRadio.displayName = 'InlineRadio';

export default InlineRadio;
