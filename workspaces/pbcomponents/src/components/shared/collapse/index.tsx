'use client';

import Content from '@/components/helpers/content';
import useControllableState from '@/hooks/use-controllable-state';
import { PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { DetailsHTMLAttributes, Ref } from 'react';

export interface CollapseProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'open'> {
  summary: string;
  open?: boolean;
  defaultOpen?: boolean;
  contentClassName?: string;
  ref?: Ref<HTMLDetailsElement>;
}

const Collapse = (props: CollapseProps) => {
  const {
    open: externalOpen,
    defaultOpen = false,
    summary,
    children,
    className,
    contentClassName,
    ref: externalRef,
    onToggle,
    ...rest
  } = props;
  const [open = false, setOpen] = useControllableState<boolean>({ value: externalOpen, defaultValue: defaultOpen });

  return (
    <details
      {...rest}
      ref={externalRef}
      open={open}
      className={clsx(
        'pbc pbc:flex pbc:flex-col pbc:w-full pbc:px-20 pbc:cursor-pointer pbc:group pbc:transition-colors pbc:duration-150',
        'pbc:rounded-8 pbc:border pbc:border-solid pbc:border-secondary-lighter pbc:hover:bg-basic-lighter',
        className,
      )}
      onToggle={(event) => {
        const nextOpen = event.currentTarget.open;
        setOpen(nextOpen);
        onToggle?.(event);
      }}
    >
      <summary className='pbc:list-none pbc:w-full pbc:py-12 pbc-summary'>
        <Content
          size='l'
          medium={true}
          rightIcon={PlusIcon}
          rightIconClassName={clsx(
            'pbc:transition-transform pbc:transition-colors pbc:duration-150 pbc:text-basic-light pbc:group-hover:text-basic-main',
            open && 'pbc:rotate-45',
          )}
          className='pbc:transition-colors pbc:duration-150 pbc:w-full pbc:text-basic-main'
        >
          {summary}
        </Content>
      </summary>
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              className='pbc:overflow-hidden'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <div className={clsx('pbc:w-full pbc:pb-16', contentClassName)}>{children}</div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </details>
  );
};

Collapse.displayName = 'Collapse';
export default Collapse;
