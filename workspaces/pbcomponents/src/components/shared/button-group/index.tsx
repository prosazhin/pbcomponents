'use client';

import { ButtonProps } from '@/components/shared/button';
import Popover, { PopoverProps, PopoverTriggerProps } from '@/components/shared/popover';
import { SizeType } from '@/types';
import clsx from 'clsx';
import { Children, HTMLAttributes, ReactElement, cloneElement, isValidElement, useMemo } from 'react';

type BaseButtonGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & SizeType;
export interface ButtonGroupProps extends BaseButtonGroupProps {
  children: ReactElement[];
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { size = 'm', children: childn, className, ...rest } = props;

  const children = useMemo(
    () =>
      childn
        ? [...childn].map((item, index) => {
            if (!isValidElement(item)) return item;

            const { props: itemProps, type } = item as ReactElement<Record<string, unknown>>;
            const first = index === 0;
            const last = index === childn.length - 1;
            const itemClassName = clsx(
              'pbc:z-0 pbc:hover:z-[1] pbc:focus:z-[2] pbc:w-full pbc:desktop:w-auto',
              first && 'pbc:rounded-r-0!',
              last && 'pbc:rounded-l-0!',
              !first && !last && 'pbc:rounded-0!',
              itemProps.className as string | undefined,
            );

            // у Popover размер и скругления получает кнопка внутри Popover.Trigger
            if (type === Popover) {
              const popoverProps = itemProps as PopoverProps;
              const popoverChildren = Children.toArray(popoverProps.children).map((child) => {
                if (!isValidElement(child) || child.type !== Popover.Trigger) return child;
                const trigger = child as ReactElement<PopoverTriggerProps>;
                const button = trigger.props.children as ReactElement<ButtonProps>;
                if (!isValidElement(button)) return child;

                return cloneElement(trigger, {
                  children: cloneElement(button, {
                    size,
                    className: clsx(itemClassName, button.props.className),
                  }),
                });
              });

              return cloneElement(item as ReactElement<PopoverProps>, { children: popoverChildren });
            }

            return cloneElement(item as ReactElement<ButtonProps>, {
              ...(itemProps as ButtonProps),
              size,
              className: itemClassName,
            });
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
