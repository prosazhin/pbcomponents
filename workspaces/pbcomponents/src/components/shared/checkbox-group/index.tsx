'use client';

import GroupFrame from '@/components/helpers/group-frame';
import Checkbox, { CheckboxProps } from '@/components/shared/checkbox';
import Toggle, { ToggleProps } from '@/components/shared/toggle';
import useControllableState from '@/hooks/use-controllable-state';
import { FieldSetHTMLAttrs, FieldSetType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { ReactElement, ReactNode, Ref, useMemo } from 'react';

const defaultOnChange = () => {};

type BaseCheckboxGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface CheckboxGroupProps extends BaseCheckboxGroupProps {
  children: ReactElement<CheckboxProps | ToggleProps>[];
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  ref?: Ref<FieldSetType>;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    size,
    label,
    description,
    errorMessage,
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
    <GroupFrame {...rest} ref={externalRef} label={label} description={description} errorMessage={errorMessage} className={className}>
      {children.map(({ type, props: itemProps }, index) => {
        // @ts-expect-error: Unreachable code error
        const Component = type?.displayName === 'Toggle' ? Toggle : Checkbox;

        return (
          <Component
            {...itemProps}
            key={index}
            name={name ?? itemProps.name}
            size={size ?? itemProps.size}
            checked={activeValue.some((item) => item === (itemProps.value ?? itemProps.children ?? ''))}
            disabled={disabled || itemProps.disabled}
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
    </GroupFrame>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
export default CheckboxGroup;
