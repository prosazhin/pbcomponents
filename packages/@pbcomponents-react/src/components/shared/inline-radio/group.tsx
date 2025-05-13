'use client';

import InlineRadio, { InlineRadioProps } from '@/components/shared/inline-radio';
import { FieldSetHTMLAttrs, FieldSetType, InputEvent, SMSizeType } from '@/types';
import clsx from 'clsx';
import { Ref, useMemo, useState } from 'react';

type BaseInlineRadioGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface InlineRadioGroupProps extends BaseInlineRadioGroupProps {
  children: React.ReactElement<InlineRadioProps>[];
  defaultValue?: string;
  onChange?: (checked: boolean, value: string, event: InputEvent) => void;
  ref?: Ref<FieldSetType>;
}

const InlineRadioGroup = (props: InlineRadioGroupProps) => {
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
        'pbc pbc:relative pbc:w-max pbc:bg-basic-lighter pbc:!p-4 pbc:appearance-none',
        size === 's' && 'pbc:rounded-8',
        size === 'm' && 'pbc:rounded-12',
        className,
      )}
    >
      <div className='pbc pbc:gap-4 pbc:inline-flex pbc:w-auto pbc:flex-row pbc:flex-nowrap pbc:items-center pbc:overflow-x-auto'>
        {children.map(({ props: itemProps }, index) => (
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
};

InlineRadioGroup.displayName = 'InlineRadioGroup';

export default InlineRadioGroup;
