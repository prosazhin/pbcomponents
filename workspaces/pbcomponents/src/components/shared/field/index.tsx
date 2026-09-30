'use client';

import Text from '@/components/helpers/text';
import { ErrorType, FieldSetHTMLAttrs, FieldSetType, LabelHTMLAttrs, LabelType } from '@/types';
import clsx from 'clsx';
import { Children, HTMLAttributes, ReactElement, ReactNode, Ref, cloneElement, isValidElement, useId, useMemo, useRef } from 'react';

import useMergeRefs from '@/hooks/use-merge-refs';

type BaseFieldProps = Omit<LabelHTMLAttrs & FieldSetHTMLAttrs, 'children'> & ErrorType;
export interface FieldProps extends BaseFieldProps {
  children?: ReactNode;
  ref?: Ref<LabelType | FieldSetType>;
}

export interface FieldLabelProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children?: ReactNode;
}

export interface FieldControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

export interface FieldDescriptionProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {
  children?: ReactNode;
}

export interface FieldErrorProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {
  children?: ReactNode;
}

const FieldLabel = (props: FieldLabelProps) => {
  void props;

  return null;
};
FieldLabel.displayName = 'Field.Label';

const FieldControl = (props: FieldControlProps) => {
  void props;

  return null;
};
FieldControl.displayName = 'Field.Control';

const FieldDescription = (props: FieldDescriptionProps) => {
  void props;

  return null;
};
FieldDescription.displayName = 'Field.Description';

const FieldError = (props: FieldErrorProps) => {
  void props;

  return null;
};
FieldError.displayName = 'Field.Error';

const Field = (props: FieldProps) => {
  const { error = false, children, className, ref: externalRef, id: externalId, ...rest } = props;

  const internalRef = useRef<LabelType | FieldSetType>(null);
  const ref = useMergeRefs(internalRef, externalRef);
  const generatedId = useId();

  const { labelProps, controlProps, descriptionProps, errorProps } = useMemo<{
    labelProps: FieldLabelProps | null;
    controlProps: FieldControlProps | null;
    descriptionProps: FieldDescriptionProps | null;
    errorProps: FieldErrorProps | null;
  }>(() => {
    let nextLabelProps: FieldLabelProps | null = null;
    let nextControlProps: FieldControlProps | null = null;
    let nextDescriptionProps: FieldDescriptionProps | null = null;
    let nextErrorProps: FieldErrorProps | null = null;

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;

      if (child.type === FieldLabel) {
        nextLabelProps = (child as ReactElement<FieldLabelProps>).props;

        return;
      }

      if (child.type === FieldControl) {
        nextControlProps = (child as ReactElement<FieldControlProps>).props;

        return;
      }

      if (child.type === FieldDescription) {
        nextDescriptionProps = (child as ReactElement<FieldDescriptionProps>).props;

        return;
      }

      if (child.type === FieldError) {
        nextErrorProps = (child as ReactElement<FieldErrorProps>).props;
      }
    });

    return {
      labelProps: nextLabelProps,
      controlProps: nextControlProps,
      descriptionProps: nextDescriptionProps,
      errorProps: nextErrorProps,
    };
  }, [children]);

  if (!controlProps) return null;

  const baseId = externalId || generatedId;
  const controlChildrenArray = Children.toArray(controlProps.children);
  const validControls = controlChildrenArray.filter((item): item is ReactElement => isValidElement(item));
  const isGroup = validControls.length > 1;
  const descriptionId = descriptionProps?.children ? `${baseId}-description` : undefined;
  const errorId = errorProps?.children ? `${baseId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const singleControl = !isGroup && validControls.length === 1 ? (validControls[0] as ReactElement<Record<string, unknown>>) : null;
  const controlId = singleControl ? ((singleControl.props.id as string | undefined) ?? `${baseId}-control`) : undefined;

  const resolvedControls = controlChildrenArray.map((item) => {
    if (!isValidElement(item)) return item;
    const controlItem = item as ReactElement<Record<string, unknown>>;

    // ошибка поля добавляется к собственной ошибке контрола, а не затирает её
    const controlError = error || Boolean(controlItem.props.error);

    if (isGroup) {
      return cloneElement(controlItem, {
        ...(controlItem.props as object),
        error: controlError,
      });
    }

    const mergedDescribedBy = [controlItem.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined;
    const ariaInvalid = controlError ? true : controlItem.props['aria-invalid'];

    return cloneElement(controlItem, {
      ...(controlItem.props as object),
      error: controlError,
      id: controlId,
      'aria-describedby': mergedDescribedBy,
      'aria-invalid': ariaInvalid,
    });
  });

  const labelClassName = clsx('pbc:text-text-primary pbc:w-full pbc:p-0', labelProps?.className);
  const controlClassName = clsx(
    'pbc pbc:flex pbc:flex-col pbc:gap-8',
    isGroup && validControls.length >= 2 && 'pbc:desktop:flex-row',
    controlProps.className,
  );

  const content = (
    <>
      <div className={controlClassName}>{resolvedControls}</div>
      {descriptionProps?.children && (
        <Text id={descriptionId} size={12} className={clsx('pbc:w-full pbc:text-text-secondary', descriptionProps.className)}>
          {descriptionProps.children}
        </Text>
      )}
      {errorProps?.children && (
        <Text id={errorId} size={12} className={clsx('pbc:w-full pbc:text-danger-400', errorProps.className)}>
          {errorProps.children}
        </Text>
      )}
    </>
  );

  if (isGroup) {
    return (
      <fieldset
        {...rest}
        ref={ref}
        id={baseId}
        aria-describedby={describedBy}
        className={clsx('pbc pbc:flex pbc:flex-col pbc:gap-4 pbc:w-full pbc:min-w-0 pbc:m-0 pbc:p-0 pbc:border-0', className)}
      >
        {labelProps?.children && (
          <Text as='legend' size={14} medium className={clsx(labelClassName, 'pbc:mb-4')}>
            {labelProps.children}
          </Text>
        )}
        {content}
      </fieldset>
    );
  }

  return (
    <label
      {...rest}
      ref={ref}
      id={baseId}
      htmlFor={controlId}
      className={clsx('pbc pbc:flex pbc:flex-col pbc:gap-4 pbc:w-full', className)}
    >
      {labelProps?.children && (
        <Text as='span' size={14} medium className={labelClassName}>
          {labelProps.children}
        </Text>
      )}
      {content}
    </label>
  );
};

Field.displayName = 'Field';

const FieldCompound: typeof Field & {
  Label: typeof FieldLabel;
  Control: typeof FieldControl;
  Description: typeof FieldDescription;
  Error: typeof FieldError;
} = Object.assign(Field, {
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
});

export default FieldCompound;
