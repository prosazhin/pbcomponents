'use client';

import Content from '@/components/helpers/content';
import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react';
import { DetailsHTMLAttributes, ReactNode, Ref, useEffect, useState } from 'react';

export interface CollapseProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'open'> {
  summary: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  contentClassName?: string;
  // вызывается, когда пункт открывают или закрывают кликом по заголовку
  onOpenChange?: (open: boolean) => void;
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
    onOpenChange,
    ...rest
  } = props;
  const [open, setOpen] = useState<boolean>(externalOpen ?? defaultOpen);
  const [visible, setVisible] = useState<boolean>(open);

  // details прячет содержимое сразу же, как только закрывается, и обрывает анимацию
  // ухода — поэтому держим элемент открытым, пока она не доиграет
  if (open && !visible) setVisible(true);

  useEffect(() => {
    if (externalOpen === undefined) return;
    setOpen(externalOpen);
  }, [externalOpen]);

  return (
    <details
      {...rest}
      ref={externalRef}
      open={open || visible}
      className={clsx(
        'pbc pbc:flex pbc:flex-col pbc:w-full pbc:px-20 pbc:cursor-pointer pbc:group pbc:transition pbc:duration-150',
        'pbc:rounded-8 pbc:inset-ring pbc:bg-basic-0 pbc:inset-ring-secondary-200 pbc:hover:bg-secondary-100 pbc:hover:inset-ring-secondary-100',
        className,
      )}
      onToggle={(event) => {
        // подстраховка на случай, когда элемент открыл сам браузер в обход клика по summary —
        // например поиск по странице раскрывает details с найденным текстом
        if (event.currentTarget.open && !open) {
          setOpen(true);
          onOpenChange?.(true);
        } else if (!event.currentTarget.open) {
          setOpen(false);
          setVisible(false);
        }
        onToggle?.(event);
      }}
    >
      <summary
        className='pbc:list-none pbc:w-full pbc:py-12 pbc-summary'
        onClick={(event) => {
          event.preventDefault();
          setOpen(!open);
          onOpenChange?.(!open);
        }}
      >
        <Content
          size={20}
          medium={true}
          rightIcon={PlusIcon}
          rightIconClassName={clsx(
            'pbc:transition pbc:duration-150 pbc:text-text-secondary pbc:group-hover:text-text-primary',
            open && 'pbc:rotate-45',
          )}
          className='pbc:transition pbc:duration-150 pbc:w-full pbc:text-text-primary'
        >
          {typeof summary === 'string' ? (
            summary
          ) : (
            // произвольный контент в заголовке (например текст + Badge) выравниваем в строку
            <span className='pbc:flex pbc:flex-1 pbc:items-center pbc:gap-x-8'>{summary}</span>
          )}
        </Content>
      </summary>
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} onExitComplete={() => setVisible(false)}>
          {open && (
            <m.div
              className='pbc:overflow-hidden'
              // анимируем только высоту и в обе стороны одинаково: содержимое просто обрезается
              // краем блока, без растворения — так раскрытие выглядит цельным
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className={clsx('pbc:w-full pbc:pb-16 pbc:text-text-primary', contentClassName)}>{children}</div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </details>
  );
};

Collapse.displayName = 'Collapse';
export default Collapse;
