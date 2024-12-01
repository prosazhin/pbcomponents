'use client';

import { ErrorType, SMSizeType, TextareaEvent, TextareaHTMLAttrs, TextareaType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseTextareaProps = Omit<TextareaHTMLAttrs, 'onChange' | 'value'> & ErrorType & SMSizeType & WrapperClassNameType;
export interface TextareaProps extends BaseTextareaProps {
  value: string;
  onChange?: (value: string, event: TextareaEvent) => void;
}

const Textarea = forwardRef<TextareaType, TextareaProps>((props, ref) => {
  const { onChange = () => {}, size = 'm', disabled = false, error = false, rows = 3, className, wrapperClassName, ...rest } = props;

  return (
    <div className={clsx('pbc pbc-relative pbc-w-full pbc-p-0 pbc-m-0', wrapperClassName)}>
      <textarea
        {...rest}
        ref={ref}
        disabled={disabled}
        className={clsx(
          'pbc pbc-border-solid pbc-block pbc-border-1 pbc-bg-transparent pbc-w-full pbc-scrollbar-hidden pbc-appearance-none pbc-transition-colors placeholder:pbc-text-basic-light pbc-text-basic-main focus:pbc-ring-0 focus:pbc-ring-offset-0',
          !error && 'pbc-border-secondary-light hover:pbc-border-primary-main focus:pbc-border-primary-main pbc-outline-primary',
          error && 'pbc-border-danger-main hover:pbc-border-danger-main focus:pbc-border-danger-main pbc-outline-danger',
          'disabled:!pbc-cursor-default disabled:!pbc-bg-basic-lighter disabled:!pbc-border-secondary-light hover:disabled:!pbc-border-secondary-light hover:disabled:!pbc-bg-basic-lighter',
          size === 's' && 'pbc-py-8 pbc-px-12 pbc-min-h-[34px] !pbc-text-t12 pbc-rounded-8',
          size === 'm' && 'pbc-py-12 pbc-px-16 pbc-min-h-48 !pbc-text-t16 pbc-rounded-12',
          className,
        )}
        rows={rows}
        onChange={(event: TextareaEvent) => onChange(event.target.value, event)}
      />
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
