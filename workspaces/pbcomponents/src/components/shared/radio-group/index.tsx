'use client';

import GroupFrame from '@/components/helpers/group-frame';
import Radio, { RadioProps } from '@/components/shared/radio';
import useControllableState from '@/hooks/use-controllable-state';
import { FieldSetHTMLAttrs, FieldSetType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { ReactElement, ReactNode, Ref, useMemo } from 'react';

type BaseRadioGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface RadioGroupProps extends BaseRadioGroupProps {
  children: ReactElement<RadioProps>[];
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  ref?: Ref<FieldSetType>;
}

const RadioGroup = (props: RadioGroupProps) => {
  const {
    size,
    label,
    description,
    errorMessage,
    value: externalValue,
    defaultValue,
    onChange,
    children: childn,
    className,
    ref: externalRef,
    ...rest
  } = props;
  const { name, disabled } = rest;

  const [activeValue, setActiveValue] = useControllableState<string>({
    value: externalValue,
    defaultValue,
    onChange,
  });

  const children = useMemo(() => (childn ? [...childn] : []), [childn]);

  if (!children.length) return null;

  return (
    <GroupFrame {...rest} ref={externalRef} label={label} description={description} errorMessage={errorMessage} className={className}>
      {children.map(({ props: itemProps }, index) => (
        <Radio
          {...itemProps}
          key={index}
          name={name ?? itemProps.name}
          size={size ?? itemProps.size}
          checked={activeValue === (itemProps.value ?? itemProps.children ?? '')}
          disabled={disabled || itemProps.disabled}
          wrapperClassName={clsx('pbc:w-full', itemProps.wrapperClassName)}
          onChange={(_, value) => setActiveValue(value)}
        />
      ))}
    </GroupFrame>
  );
};

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
