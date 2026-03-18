'use client';

import Radio, { RadioProps } from '@/components/shared/radio';
import useControllableState from '@/hooks/use-controllable-state';
import { FieldSetHTMLAttrs, FieldSetType, InputEvent, SMSizeType } from '@/types';
import clsx from 'clsx';
import { ReactElement, Ref, useMemo } from 'react';

type BaseRadioGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface RadioGroupProps extends BaseRadioGroupProps {
  children: ReactElement<RadioProps>[];
  value?: string;
  defaultValue?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<FieldSetType>;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { size, value: externalValue, defaultValue, onChange = () => {}, children: childn, className, ref: externalRef, ...rest } = props;
  const { name, disabled } = rest;

  const [activeValue, setActiveValue] = useControllableState<string>({
    value: externalValue,
    defaultValue,
  });

  const children = useMemo(() => (childn ? [...childn] : []), [childn]);

  if (!children.length) return null;

  return (
    <fieldset
      {...rest}
      ref={externalRef}
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
          checked={activeValue === (itemProps.value ?? itemProps.children ?? '')}
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
