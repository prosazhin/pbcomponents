'use client';

import Button, { ButtonProps } from '@/components/shared/button/button';
import { ComponentWrapperType, DivType, SizeType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

export interface ButtonGroupProps<T> extends ComponentWrapperType<T>, SizeType {}

const ButtonGroup = forwardRef<DivType, ButtonGroupProps<React.ReactElement<ButtonProps>>>((props, ref) => {
  const { children, className, size = 'm', ...rest } = props;

  return (
    <div {...rest} ref={ref} className={clsx('pbc pbc-flex-inline -pbc-space-x-1 pbc-relative', className)}>
      {children &&
        children.map(({ props: itemProps }, index) => {
          const first = index === 0;
          const last = index === children.length - 1;

          return (
            <Button
              {...itemProps}
              key={index}
              size={size}
              className={clsx(
                'hover:pbc-z-[1] focus:pbc-z-[2]',
                first && size === 'xs' && '!pbc-rounded-l-6 !pbc-rounded-r-0',
                first && size === 's' && '!pbc-rounded-l-8 !pbc-rounded-r-0',
                first && size === 'm' && '!pbc-rounded-l-12 !pbc-rounded-r-0',
                first && size === 'l' && '!pbc-rounded-l-16 !pbc-rounded-r-0',
                last && size === 'xs' && '!pbc-rounded-l-0 !pbc-rounded-r-6',
                last && size === 's' && '!pbc-rounded-l-0 !pbc-rounded-r-8',
                last && size === 'm' && '!pbc-rounded-l-0 !pbc-rounded-r-12',
                last && size === 'l' && '!pbc-rounded-l-0 !pbc-rounded-r-16',
                !first && !last && '!pbc-rounded-0',
                itemProps.className,
              )}
            />
          );
        })}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
