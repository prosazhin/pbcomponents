'use client';

import Content from '@/components/helpers/content';
import Text from '@/components/helpers/text';
import { DetailsHTMLAttrs, DetailsType } from '@/types';
import { PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

export interface CollapseProps extends DetailsHTMLAttrs {
  summary: string;
}

const Collapse = forwardRef<DetailsType, CollapseProps>((props, ref) => {
  const { open: defaultOpen, summary, children, className, ...rest } = props;
  const [open, setOpen] = useState<boolean>(defaultOpen || false);

  return (
    <details
      {...rest}
      ref={ref}
      open={open}
      className={clsx(
        'pbc pbc-flex pbc-flex-col pbc-w-full pbc-px-20 pbc-cursor-pointer pbc-group pbc-transition-colors',
        'pbc-rounded-8 pbc-border-1 pbc-border-solid pbc-border-secondary-lighter hover:pbc-bg-basic-lighter',
        className,
      )}
      onToggle={(event) => setOpen((event.currentTarget as DetailsType).open)}
    >
      <summary className='pbc-list-none pbc-w-full pbc-py-12 pbc-summary'>
        <Content
          size='l'
          medium={true}
          rightIcon={PlusIcon}
          // eslint-disable-next-line tailwindcss/no-contradicting-classname
          rightIconClassName={clsx(
            'pbc-transition-transform pbc-transition-colors pbc-text-basic-light group-hover:pbc-text-basic-main',
            open && 'pbc-rotate-45',
          )}
          className='pbc-transition-colors pbc-w-full pbc-text-basic-main'
        >
          {summary}
        </Content>
      </summary>
      <Text as='div' size='m' className='pbc-w-full pbc-pb-16 pbc-pointer-events-none'>
        {children}
      </Text>
    </details>
  );
});

Collapse.displayName = 'Collapse';

export default Collapse;
