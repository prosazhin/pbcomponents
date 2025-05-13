'use client';

import Checkbox, { CheckboxProps } from '@/components/shared/checkbox';
import Switch, { SwitchProps } from '@/components/shared/checkbox/switch';
import { FieldSetHTMLAttrs, FieldSetType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { Ref, useEffect, useMemo, useState } from 'react';

type BaseCheckboxGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface CheckboxGroupProps extends BaseCheckboxGroupProps {
  children: React.ReactElement<CheckboxProps | SwitchProps>[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  ref?: Ref<FieldSetType>;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { size, defaultValue = [], onChange = () => {}, children: childn, className, ref, ...rest } = props;
  const { name, disabled } = rest;
  const [activeValue, setActiveValue] = useState<string[]>(defaultValue);
  const children = useMemo(() => (childn ? [...childn] : []), [childn, activeValue, size, disabled, name, onChange]);

  useEffect(() => {
    onChange(activeValue);
  }, [activeValue]);

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
      {children.map(({ type, props: itemProps }, index) => {
        // @ts-expect-error: Unreachable code error
        const Component = type?.displayName === 'Switch' ? Switch : Checkbox;

        return (
          <Component
            {...itemProps}
            key={index}
            name={name ? name : undefined}
            size={size}
            checked={activeValue.some((item) => item === itemProps.value || item === itemProps.children)}
            disabled={disabled ? disabled : undefined}
            wrapperClassName={clsx('pbc:w-full', itemProps.wrapperClassName)}
            onChange={(_, value) => {
              let result = [...activeValue];
              if (activeValue.some((item) => item === value)) {
                result = activeValue.filter((item) => item !== value);
              } else {
                result.push(value);
              }
              setActiveValue(result);
            }}
          />
        );
      })}
    </fieldset>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
