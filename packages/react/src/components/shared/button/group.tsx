'use client';

import Button, { ButtonProps } from '@/components/shared/button';
import { DivHTMLAttrs, SizeType } from '@/types';
import clsx from 'clsx';

type ButtonGroupTType = React.ReactElement<ButtonProps>;
type BaseButtonGroupProps<T> = Omit<DivHTMLAttrs, 'children'> & {
  children?: T[];
} & SizeType;

export interface ButtonGroupProps extends BaseButtonGroupProps<ButtonGroupTType> {}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { children, className, size = 'm', ...rest } = props;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max mobile:pbc-w-full pbc-flex-nowrap pbc-items-center pbc-justify-center -pbc-space-x-1 pbc-relative',
        className,
      )}
    >
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
                'pbc-z-0 hover:pbc-z-[1] focus:pbc-z-[2] mobile:pbc-w-full',
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
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
