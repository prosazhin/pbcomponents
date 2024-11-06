'use client';

import Text from '@/components/helpers/text';
import { InputProps } from '@/components/shared/field/input';
import { TextareaProps } from '@/components/shared/field/textarea';
import { ErrorType, FieldSetHTMLAttrs, FieldSetType, LabelHTMLAttrs, LabelType } from '@/types';
import clsx from 'clsx';
import { forwardRef, useMemo, useRef } from 'react';

type FieldTType = React.ReactElement<InputProps | TextareaProps>;
type BaseFieldProps = Omit<LabelHTMLAttrs & FieldSetHTMLAttrs, 'children'> & ErrorType;

export interface FieldProps extends BaseFieldProps {
  children: FieldTType | FieldTType[];
  label?: string;
  description?: string;
}

const Field = forwardRef<LabelType | FieldSetType, FieldProps>((props, ref) => {
  const { label, description, error = false, children: childn, className, ...rest } = props;
  const isArray = Array.isArray(childn);

  const children = useMemo(
    () =>
      isArray
        ? [...childn].map((item) => ({ ...item, props: { ...item.props, error } }))
        : { ...childn, props: { ...childn.props, error } },
    [childn, error],
  );

  const Component = isArray ? 'fieldset' : 'label';

  const internalRef = useRef<LabelType | FieldSetType>(null);
  const fieldRef = (ref || internalRef) as React.MutableRefObject<LabelType | FieldSetType>;

  return (
    <Component {...rest} ref={fieldRef as any} className={clsx('pbc pbc-flex pbc-flex-col pbc-w-full', className)}>
      <Text as={isArray ? 'legend' : 'span'} size='s' className={clsx('pbc-text-basic-main pbc-w-full pbc-mb-4')}>
        {label}
      </Text>
      <div
        className={clsx(
          'pbc pbc-flex pbc-flex-row pbc-gap-8',
          isArray && childn.length === 2 && 'xs:pbc-flex-col',
          isArray && childn.length >= 3 && 'mobile:pbc-flex-col',
        )}
      >
        {children}
      </div>
      <Text size='s' className={clsx('pbc-w-full pbc-mt-4', error ? 'pbc-text-danger-main' : 'pbc-text-basic-light')}>
        {description}
      </Text>
    </Component>
  );
});

Field.displayName = 'Field';

export default Field;
