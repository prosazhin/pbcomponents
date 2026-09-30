'use client';

import Text from '@/components/helpers/text';
import { FieldSetHTMLAttrs, FieldSetType } from '@/types';
import clsx from 'clsx';
import { ReactNode, Ref } from 'react';

export interface GroupFrameProps extends Omit<FieldSetHTMLAttrs, 'children'> {
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  listClassName?: string;
  ref?: Ref<FieldSetType>;
}

// общая обёртка для CheckboxGroup и RadioGroup: подпись, описание, ошибка и список пунктов
const GroupFrame = (props: GroupFrameProps) => {
  const { label, description, errorMessage, children, className, listClassName, ref: externalRef, ...rest } = props;

  return (
    <fieldset
      {...rest}
      ref={externalRef}
      className={clsx(
        'pbc pbc:relative pbc:w-full pbc:min-w-0 pbc:appearance-none pbc:m-0 pbc:p-0 pbc:border-0 pbc:flex pbc:flex-col',
        className,
      )}
    >
      {label && (
        <Text as='legend' size={14} medium className='pbc:w-full pbc:p-0 pbc:mb-4 pbc:text-text-primary'>
          {label}
        </Text>
      )}
      <div className='pbc pbc:flex pbc:w-full pbc:flex-col pbc:gap-4'>
        {description && (
          <Text as='p' size={12} className='pbc:w-full pbc:m-0 pbc:text-text-secondary'>
            {description}
          </Text>
        )}
        {errorMessage && (
          <Text as='p' size={12} className='pbc:w-full pbc:m-0 pbc:text-danger-400'>
            {errorMessage}
          </Text>
        )}
        <div
          className={clsx(
            'pbc pbc:flex pbc:w-full pbc:flex-col pbc:gap-6',
            (label || description || errorMessage) && 'pbc:pt-4',
            listClassName,
          )}
        >
          {children}
        </div>
      </div>
    </fieldset>
  );
};

GroupFrame.displayName = 'GroupFrame';
export default GroupFrame;
