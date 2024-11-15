'use client';

import Button, { ButtonProps } from '@/components/shared/button';
import { DivHTMLAttrs, SizeType } from '@/types';
import clsx from 'clsx';
import { useMemo } from 'react';

type BaseButtonGroupProps = Omit<DivHTMLAttrs, 'children'> & SizeType;
export interface ButtonGroupProps extends BaseButtonGroupProps {
  children: React.ReactElement<ButtonProps>[];
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { size = 'm', children: childn, className, ...rest } = props;
  const children = useMemo(() => (childn ? [...childn] : []), [childn, size]);

  if (!children.length) return null;

  return (
    <div
      {...rest}
      className={clsx(
        'pbc pbc-inline-flex pbc-w-max mobile:pbc-w-full pbc-flex-nowrap pbc-items-center pbc-justify-center -pbc-space-x-1 pbc-relative',
        className,
      )}
    >
      {children.map(({ props: itemProps }, index) => {
        const first = index === 0;
        const last = index === children.length - 1;

        return (
          <Button
            {...itemProps}
            key={index}
            size={size}
            className={clsx(
              'pbc-z-0 hover:pbc-z-[1] focus:pbc-z-[2] mobile:pbc-w-full',
              first && '!pbc-rounded-r-0',
              last && '!pbc-rounded-l-0',
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
