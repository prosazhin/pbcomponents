'use client';

import Collapse, { CollapseProps } from '@/components/shared/collapse';
import { DivHTMLAttrs } from '@/types';
import clsx from 'clsx';
import { useMemo } from 'react';

export interface CollapseGroupProps extends Omit<DivHTMLAttrs, 'children'> {
  children?: React.ReactElement<CollapseProps>[];
  name?: string;
}

const CollapseGroup = (props: CollapseGroupProps) => {
  const { name, children: childn, className, ...rest } = props;
  const children = useMemo(() => (childn ? [...childn] : []), [childn, name]);

  if (!children.length) return null;

  return (
    <div {...rest} className={clsx('pbc pbc:w-full pbc:flex pbc:flex-col pbc:items-start pbc:gap-y-8', className)}>
      {children.map(({ props: itemProps }, index) => (
        <Collapse {...itemProps} key={index} name={name} />
      ))}
    </div>
  );
};

CollapseGroup.displayName = 'CollapseGroup';

export default CollapseGroup;
