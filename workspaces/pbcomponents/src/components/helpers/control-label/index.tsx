'use client';

import Text from '@/components/helpers/text';
import { LabelPlaceType, SMSizeType, TextClassNameType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { ReactNode } from 'react';

type BaseControlLabelProps = SMSizeType & LabelPlaceType & WrapperClassNameType & TextClassNameType;
export interface ControlLabelProps extends BaseControlLabelProps {
  control: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  // вид контрола — от него зависит отступ описания
  kind: 'checkbox' | 'toggle';
}

// отступ описания, чтобы оно начиналось там же, где подпись (значения из фигмы)
const DESCRIPTION_INDENT = {
  checkbox: { right: { s: 'pbc:pl-20', m: 'pbc:pl-26' }, left: { s: 'pbc:pr-20', m: 'pbc:pr-26' } },
  toggle: { right: { s: 'pbc:pl-36', m: 'pbc:pl-46' }, left: { s: 'pbc:pr-36', m: 'pbc:pr-46' } },
} as const;

// общая раскладка для Checkbox, Toggle и Radio: контрол + подпись + описание
const ControlLabel = (props: ControlLabelProps) => {
  const {
    control,
    children,
    description,
    size = 'm',
    labelPlace = 'right',
    disabled = false,
    kind,
    wrapperClassName,
    textClassName,
  } = props;

  return (
    <label
      className={clsx('pbc pbc:inline-flex pbc:flex-col pbc:cursor-pointer pbc:group', disabled && 'pbc:cursor-default!', wrapperClassName)}
    >
      <span
        className={clsx(
          'pbc pbc:flex pbc:w-full pbc:flex-nowrap pbc:items-center',
          size === 's' && 'pbc:gap-6 pbc:min-h-22',
          size === 'm' && 'pbc:gap-8 pbc:min-h-24',
          labelPlace === 'left' && 'pbc:flex-row-reverse',
        )}
      >
        <span className='pbc pbc:relative pbc:flex pbc:shrink-0'>{control}</span>
        {children && (
          <Text
            size={size === 's' ? 14 : 16}
            className={clsx(
              'pbc:flex-1 pbc:transition-colors pbc:duration-150',
              disabled ? 'pbc:text-text-secondary' : 'pbc:text-text-primary',
              textClassName,
            )}
          >
            {children}
          </Text>
        )}
      </span>
      {description && (
        <Text
          size={size === 's' ? 10 : 12}
          className={clsx('pbc:w-full pbc:text-text-secondary', DESCRIPTION_INDENT[kind][labelPlace][size])}
        >
          {description}
        </Text>
      )}
    </label>
  );
};

ControlLabel.displayName = 'ControlLabel';
export default ControlLabel;
