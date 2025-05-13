'use client';

import Radio, { RadioProps } from '@/components/shared/radio';
import { FieldSetHTMLAttrs, FieldSetType, InputEvent, SMSizeType } from '@/types';
import clsx from 'clsx';
import { Ref, useMemo, useState } from 'react';

type BaseRadioGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface RadioGroupProps extends BaseRadioGroupProps {
  children: React.ReactElement<RadioProps>[];
  defaultValue?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<FieldSetType>;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { size, defaultValue, onChange = () => {}, children: childn, className, ref, ...rest } = props;
  const { name, disabled } = rest;
  const [activeValue, setActiveValue] = useState<string | undefined>(defaultValue);
  const children = useMemo(() => (childn ? [...childn] : []), [childn, activeValue, size, disabled, name, onChange]);

  if (!children.length) return null;

  return (
    <fieldset
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc:relative pbc:w-full pbc:appearance-none pbc:flex pbc:flex-col',
        size === 's' && 'pbc:gap-8',
        size === 'm' && 'pbc:gap-16',
        className,
      )}
    >
      {children.map(({ props: itemProps }, index) => (
        <Radio
          {...itemProps}
          key={index}
          name={name ? name : undefined}
          size={size}
          checked={activeValue === itemProps.value}
          disabled={disabled ? disabled : undefined}
          wrapperClassName={clsx('pbc:w-full', itemProps.wrapperClassName)}
          onChange={(checked, value, event) => {
            setActiveValue(value);
            onChange(checked, value, event);
          }}
        />
      ))}
    </fieldset>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
