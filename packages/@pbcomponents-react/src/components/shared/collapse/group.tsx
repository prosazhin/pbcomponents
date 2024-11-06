'use client';

import Collapse, { CollapseProps } from '@/components/shared/collapse';
import { DivHTMLAttrs } from '@/types';
import clsx from 'clsx';

export interface CollapseGroupProps extends Omit<DivHTMLAttrs, 'children'> {
  children?: React.ReactElement<CollapseProps>[];
  name?: string;
}

const CollapseGroup = (props: CollapseGroupProps) => {
  const { name, children, className, ...rest } = props;

  return (
    <div {...rest} className={clsx('pbc pbc-w-full pbc-flex pbc-flex-col pbc-items-start pbc-gap-y-8', className)}>
      {children && children.map(({ props: itemProps }, index) => <Collapse {...itemProps} key={index} name={name} />)}
    </div>
  );
};

CollapseGroup.displayName = 'CollapseGroup';

export default CollapseGroup;
