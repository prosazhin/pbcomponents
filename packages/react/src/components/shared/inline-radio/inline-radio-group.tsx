'use client';

import InlineRadio, { InlineRadioProps } from '@/components/shared/inline-radio/inline-radio';
import { FieldSetHTMLAttrs, FieldSetType, InputEvent, SMSizeType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

type InlineRadioGroupTType = React.ReactElement<InlineRadioProps>;
type BaseInlineRadioGroupProps<T> = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & {
  children?: T[];
} & SMSizeType;

export interface InlineRadioGroupProps extends BaseInlineRadioGroupProps<InlineRadioGroupTType> {
  defaultValue?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
}

const InlineRadioGroup = forwardRef<FieldSetType, InlineRadioGroupProps>((props, ref) => {
  const { children, className, defaultValue, size, onChange = () => {}, ...rest } = props;
  const { name, disabled } = rest;
  const [activeValue, setActiveValue] = useState<string | undefined>(defaultValue);

  return (
    <fieldset
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc-relative pbc-w-max pbc-bg-basic-lighter !pbc-p-4 pbc-appearance-none',
        size === 's' && 'pbc-rounded-8',
        size === 'm' && 'pbc-rounded-12',
        className,
      )}
    >
      <div className='pbc pbc-gap-4 pbc-inline-flex pbc-w-auto pbc-flex-row pbc-flex-nowrap pbc-items-center pbc-overflow-x-auto'>
        {children &&
          children.map(({ props: itemProps }, index) => (
            <InlineRadio
              {...itemProps}
              key={index}
              name={name ? name : undefined}
              size={size}
              checked={activeValue === itemProps.value}
              disabled={disabled ? disabled : undefined}
              onChange={(checked, value, event) => {
                setActiveValue(value);
                onChange(checked, value, event);
              }}
            />
          ))}
      </div>
    </fieldset>
  );
});

InlineRadioGroup.displayName = 'InlineRadioGroup';

export default InlineRadioGroup;
