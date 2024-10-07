'use client';

import Checkbox, { CheckboxProps } from '@/components/shared/checkbox/checkbox';
import { FieldSetHTMLAttrs, FieldSetType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useEffect, useState } from 'react';

type CheckboxGroupTType = React.ReactElement<CheckboxProps>;
type BaseCheckboxGroupProps<T> = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & {
  children?: T[];
} & SMSizeType;

export interface CheckboxGroupProps extends BaseCheckboxGroupProps<CheckboxGroupTType> {
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

const CheckboxGroup = forwardRef<FieldSetType, CheckboxGroupProps>((props, ref) => {
  const { children, className, defaultValue = [], size, onChange = () => {}, ...rest } = props;
  const { name, disabled } = rest;
  const [activeValue, setActiveValue] = useState<string[]>(defaultValue);

  useEffect(() => {
    onChange(activeValue);
  }, [activeValue]);

  return (
    <fieldset
      {...rest}
      ref={ref}
      className={clsx(
        'pbc pbc-relative pbc-w-full pbc-appearance-none pbc-flex pbc-flex-col',
        size === 's' && 'pbc-gap-8',
        size === 'm' && 'pbc-gap-16',
        className,
      )}
    >
      {children &&
        children.map(({ props: itemProps }, index) => (
          <Checkbox
            {...itemProps}
            key={index}
            name={name ? name : undefined}
            size={size}
            checked={activeValue.some((item) => item === itemProps.value || item === itemProps.children)}
            disabled={disabled ? disabled : undefined}
            wrapperClassName={clsx('pbc-w-full', itemProps.wrapperClassName)}
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
        ))}
    </fieldset>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
