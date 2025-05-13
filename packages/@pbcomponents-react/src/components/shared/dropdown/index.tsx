'use client';

import Button, { ButtonProps } from '@/components/shared/button';
import DropdownItem, { DropdownItemProps } from '@/components/shared/dropdown/item';
import { DivHTMLAttrs, WrapperClassNameType } from '@/types';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { useMemo, useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import useKeydown from '@/hooks/use-keydown';

type BaseDropdownProps = Omit<DivHTMLAttrs, 'children'> & WrapperClassNameType;
export interface DropdownProps extends BaseDropdownProps {
  children: React.ReactElement<DropdownItemProps>[];
  button?: React.ReactElement<ButtonProps>;
  align?: 'left' | 'right';
}

const Dropdown = (props: DropdownProps) => {
  const { align = 'left', button, children: childn, className, wrapperClassName, ...rest } = props;
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const children = useMemo(() => (childn ? [...childn] : []), [childn]);

  useClickOutside([dropdownRef, buttonRef], () => setOpen(false));
  useKeydown(['Escape'], () => setOpen(false));

  return (
    <div {...rest} className={clsx('pbc pbc:relative pbc:w-max pbc:max-xs:w-full', wrapperClassName)}>
      {button && <Button {...button.props} type='button' rightIcon={ChevronUpDownIcon} ref={buttonRef} onClick={() => setOpen(!open)} />}
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              ref={dropdownRef}
              className={clsx(
                'pbc:absolute pbc:mx-auto pbc:z-10 pbc:box-border pbc:w-280 pbc:max-xs:w-full pbc:max-h-300 pbc:bottom-0 pbc:translate-y-[calc(100%+6px)]',
                'pbc:bg-white pbc:rounded-16 pbc:border-1 pbc:border-solid pbc:border-secondary-lighter pbc:p-8 pbc-scrollbar-hidden pbc:overflow-y-auto',
                align === 'left' && 'pbc:left-0',
                align === 'right' && 'pbc:right-0',
                className,
              )}
              initial={{ opacity: 0, bottom: 6 }}
              animate={{ opacity: 1, bottom: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
              exit={{ opacity: 0, bottom: 6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <ul className='pbc:flex pbc:flex-col pbc:list-none pbc:m-0 pbc:p-0'>
                {children.map(({ props: itemProps }, index) => {
                  return (
                    <li key={index} className='pbc:w-full'>
                      <DropdownItem
                        {...itemProps}
                        onClick={(event) => {
                          if (itemProps.onClick) itemProps.onClick(event);
                          setOpen(false);
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
