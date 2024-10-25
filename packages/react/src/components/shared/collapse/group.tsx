'use client';

import Collapse, { CollapseProps } from '@/components/shared/collapse';
import { DivHTMLAttrs } from '@/types';
import clsx from 'clsx';

type CollapseGroupTType = React.ReactElement<CollapseProps>;
type BaseCollapseGroupProps<T> = Omit<DivHTMLAttrs, 'children'> & {
  children?: T[];
};

export interface CollapseGroupProps extends BaseCollapseGroupProps<CollapseGroupTType> {
  name?: string;
}

const CollapseGroup = (props: CollapseGroupProps) => {
  const { children, className, name, ...rest } = props;

  return (
    <div {...rest} className={clsx('pbc pbc-w-full pbc-flex pbc-flex-col pbc-items-start pbc-gap-y-8', className)}>
      {children && children.map(({ props: itemProps }, index) => <Collapse {...itemProps} key={index} name={name} />)}
    </div>
  );
};

CollapseGroup.displayName = 'CollapseGroup';

export default CollapseGroup;
