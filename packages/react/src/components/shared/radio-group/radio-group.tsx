'use client';

import Radio, { RadioProps } from '@/components/shared/radio-group/radio';
import { ComponentWrapperType, FieldSetType, RadioGroupType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

export interface RadioGroupProps<T> extends ComponentWrapperType<T>, RadioGroupType, SMSizeType {}

const RadioGroup = forwardRef<FieldSetType, RadioGroupProps<React.ReactElement<RadioProps>>>((props, ref) => {
  const { children, className, defaultValue, size, onChange, ...rest } = props;
  const { name, disabled } = rest;
  const [activeValue, setActiveValue] = useState<string | undefined>(defaultValue);

  return (
    <fieldset
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc-relative pbc-w-max pbc-appearance-none pbc-flex pbc-flex-col',
        size === 's' && 'pbc-gap-8',
        size === 'm' && 'pbc-gap-16',
        className,
      )}
    >
      {children &&
        children.map(({ props: itemProps }, index) => (
          <Radio
            {...itemProps}
            key={index}
            name={name ? name : undefined}
            size={size}
            checked={activeValue === itemProps.value}
            disabled={disabled ? disabled : undefined}
            onChange={(value, event) => {
              setActiveValue(value);
              if (onChange) onChange(value, event);
            }}
          />
        ))}
    </fieldset>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
