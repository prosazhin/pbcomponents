'use client';

import { ErrorType, SMSizeType, TextareaEvent, TextareaHTMLAttrs, TextareaType, WrapperClassNameType } from '@/types';
import clsx from 'clsx';
import { Ref } from 'react';

type BaseTextareaProps = Omit<TextareaHTMLAttrs, 'onChange' | 'value'> & ErrorType & SMSizeType & WrapperClassNameType;
export interface TextareaProps extends BaseTextareaProps {
  value: string;
  onChange?: (value: string, event: TextareaEvent) => void;
  ref?: Ref<TextareaType>;
}

const Textarea = (props: TextareaProps) => {
  const { onChange = () => {}, size = 'm', disabled = false, error = false, rows = 3, className, wrapperClassName, ref, ...rest } = props;

  return (
    <div className={clsx('pbc pbc:relative pbc:w-full pbc:p-0 pbc:m-0', wrapperClassName)}>
      <textarea
        {...rest}
        ref={ref}
        disabled={disabled}
        className={clsx(
          'pbc pbc:border-solid pbc:block pbc:border-1 pbc:bg-transparent pbc:w-full pbc-scrollbar-hidden pbc:appearance-none pbc:transition-colors pbc:duration-150 pbc:placeholder:text-basic-light pbc:text-basic-main pbc:focus:ring-0 pbc:focus:ring-offset-0',
          !error &&
            'pbc:border-secondary-light pbc:hover:border-primary-main pbc:focus:border-primary-main pbc:focus:outline-outline-primary pbc:outline-4 pbc:outline-offset-0',
          error &&
            'pbc:border-danger-main pbc:hover:border-danger-main pbc:focus:border-danger-main pbc:focus:outline-outline-danger pbc:outline-4 pbc:outline-offset-0',
          'pbc:disabled:!cursor-default pbc:disabled:!bg-basic-lighter pbc:disabled:!border-secondary-light pbc:hover:disabled:!border-secondary-light pbc:hover:disabled:!bg-basic-lighter',
          size === 's' && 'pbc:py-8 pbc:px-12 pbc:min-h-[34px] pbc:!text-t12 pbc:rounded-8',
          size === 'm' && 'pbc:py-12 pbc:px-16 pbc:min-h-48 pbc:!text-t16 pbc:rounded-12',
          className,
        )}
        rows={rows}
        onChange={(event: TextareaEvent) => onChange(event.target.value, event)}
      />
    </div>
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
