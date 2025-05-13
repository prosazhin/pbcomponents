'use client';

import { ButtonProps } from '@/components/shared/button';
import { DropdownProps } from '@/components/shared/dropdown';
import { DivHTMLAttrs, SizeType } from '@/types';
import clsx from 'clsx';
import { useMemo } from 'react';

type BaseButtonGroupProps = Omit<DivHTMLAttrs, 'children'> & SizeType;
export interface ButtonGroupProps extends BaseButtonGroupProps {
  children: React.ReactElement<ButtonProps | DropdownProps>[];
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { size = 'm', children: childn, className, ...rest } = props;
  const children = useMemo(
    () =>
      childn
        ? [...childn].map((item, index) => {
            const { props: itemProps, type } = item;
            const first = index === 0;
            const last = index === childn.length - 1;
            const itemClassName = clsx(
              'pbc:z-0 pbc:hover:z-[1] pbc:focus:z-[2] pbc:w-full pbc:desktop:w-auto',
              first && 'pbc:!rounded-r-0',
              last && 'pbc:!rounded-l-0',
              !first && !last && 'pbc:!rounded-0',
              itemProps.className,
            );

            // @ts-expect-error: Unreachable code error
            const componentName = type?.displayName;

            if (componentName === 'Dropdown') {
              return {
                ...item,
                props: {
                  ...itemProps,
                  button:
                    'button' in itemProps && itemProps.button
                      ? { ...itemProps.button, props: { ...itemProps.button.props, size, className: itemClassName } }
                      : undefined,
                },
              };
            }

            return { ...item, props: { ...itemProps, size, className: itemClassName } };
          })
        : [],
    [childn, size],
  );

  if (!children.length) return null;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc:inline-flex pbc:w-full pbc:desktop:w-auto pbc:flex-nowrap pbc:items-center pbc:justify-center pbc:-space-x-1 pbc:relative',
        className,
      )}
    >
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
