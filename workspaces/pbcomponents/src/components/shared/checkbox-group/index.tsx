'use client';

import Checkbox, { CheckboxProps } from '@/components/shared/checkbox';
import Switch, { SwitchProps } from '@/components/shared/switch';
import useControllableState from '@/hooks/use-controllable-state';
import { FieldSetHTMLAttrs, FieldSetType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { ReactElement, Ref, useMemo } from 'react';

const defaultOnChange = () => {};

type BaseCheckboxGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface CheckboxGroupProps extends BaseCheckboxGroupProps {
  children: ReactElement<CheckboxProps | SwitchProps>[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  ref?: Ref<FieldSetType>;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    size,
    value: externalValue,
    defaultValue = [],
    onChange = defaultOnChange,
    children: childn,
    className,
    ref: externalRef,
    ...rest
  } = props;
  const { name, disabled } = rest;

  const [activeValue = [], setActiveValue] = useControllableState<string[]>({
    value: externalValue,
    defaultValue,
    onChange,
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
      {children.map(({ type, props: itemProps }, index) => {
        // @ts-expect-error: Unreachable code error
        const Component = type?.displayName === 'Switch' ? Switch : Checkbox;

        return (
          <Component
            {...itemProps}
            key={index}
            name={name ? name : undefined}
            size={size}
            checked={activeValue.some((item) => item === (itemProps.value ?? itemProps.children ?? ''))}
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
