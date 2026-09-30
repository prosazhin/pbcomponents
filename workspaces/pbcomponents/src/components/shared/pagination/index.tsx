'use client';

import Button from '@/components/shared/button';
import useControllableState from '@/hooks/use-controllable-state';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import { HTMLAttributes, Ref } from 'react';

type PaginationItem = number | 'ellipsis';

// номера страниц с многоточиями: первая, последняя и siblings соседей вокруг текущей
const getItems = (page: number, total: number, siblings: number): PaginationItem[] => {
  // сколько кнопок помещается без многоточий: первая, последняя, текущая, соседи и два места под многоточия
  const maxVisible = siblings * 2 + 5;

  if (total <= maxVisible) return Array.from({ length: total }, (_, index) => index + 1);

  const start = Math.max(2, Math.min(page - siblings, total - siblings * 2 - 2));
  const end = Math.min(total - 1, Math.max(page + siblings, siblings * 2 + 3));
  const items: PaginationItem[] = [1];

  if (start > 2) items.push('ellipsis');
  for (let index = start; index <= end; index += 1) items.push(index);
  if (end < total - 1) items.push('ellipsis');
  items.push(total);

  return items;
};

type BasePaginationProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'>;
export interface PaginationProps extends BasePaginationProps {
  // количество страниц
  total: number;
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  // сколько страниц показывать по обе стороны от текущей
  siblings?: number;
  size?: 'xs' | 's';
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  ref?: Ref<HTMLElement>;
}

const Pagination = (props: PaginationProps) => {
  const {
    total,
    page: externalPage,
    defaultPage = 1,
    onChange,
    siblings = 1,
    size = 's',
    prevAriaLabel = 'Previous page',
    nextAriaLabel = 'Next page',
    className,
    ref: externalRef,
    ...rest
  } = props;

  const [page = 1, setPage] = useControllableState<number>({ value: externalPage, defaultValue: defaultPage, onChange });

  if (total < 1) return null;

  const items = getItems(page, total, siblings);
  const buttonClassName = 'pbc:w-auto! pbc:min-w-0';

  return (
    <nav
      {...rest}
      ref={externalRef}
      className={clsx('pbc pbc:inline-flex pbc:items-center pbc:justify-center pbc:gap-8 pbc:p-8 pbc:rounded-12 pbc:bg-basic-0', className)}
    >
      <Button
        size={size}
        theme='border'
        color='secondary'
        leftIcon={ChevronLeftIcon}
        aria-label={prevAriaLabel}
        disabled={page <= 1}
        className={buttonClassName}
        onClick={() => setPage(page - 1)}
      />
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <Button
            key={`ellipsis-${index}`}
            size={size}
            theme='ghost'
            color='secondary'
            tabIndex={-1}
            aria-hidden
            className={clsx(buttonClassName, 'pbc:pointer-events-none')}
          >
            ...
          </Button>
        ) : (
          <Button
            key={item}
            size={size}
            theme={item === page ? 'filled' : 'border'}
            color={item === page ? 'primary' : 'secondary'}
            aria-current={item === page ? 'page' : undefined}
            className={buttonClassName}
            onClick={() => setPage(item)}
          >
            {String(item)}
          </Button>
        ),
      )}
      <Button
        size={size}
        theme='border'
        color='secondary'
        leftIcon={ChevronRightIcon}
        aria-label={nextAriaLabel}
        disabled={page >= total}
        className={buttonClassName}
        onClick={() => setPage(page + 1)}
      />
    </nav>
  );
};

Pagination.displayName = 'Pagination';
export default Pagination;
