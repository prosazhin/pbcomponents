'use client';

import Radio, { RadioProps } from '@/components/shared/radio/radio';
import { FieldSetHTMLAttrs, FieldSetType, InputEvent, SMSizeType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

type RadioGroupTType = React.ReactElement<RadioProps>;
type BaseRadioGroupProps<T> = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & {
  children?: T[];
} & SMSizeType;

export interface RadioGroupProps extends BaseRadioGroupProps<RadioGroupTType> {
  defaultValue?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
}

const RadioGroup = forwardRef<FieldSetType, RadioGroupProps>((props, ref) => {
  const { children, className, defaultValue, size, onChange = () => {}, ...rest } = props;
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
            onChange={(checked, value, event) => {
              setActiveValue(value);
              onChange(checked, value, event);
            }}
          />
        ))}
    </fieldset>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
