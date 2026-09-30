'use client';

import { SizeType } from '@/types';
import clsx from 'clsx';
import { HTMLAttributes, Ref } from 'react';

type BaseProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & SizeType;
export interface ProgressProps extends BaseProgressProps {
  // заполненность в процентах, от 0 до 100
  value?: number;
  // показывать ли серую дорожку под полосой
  background?: boolean;
  barClassName?: string;
  ref?: Ref<HTMLDivElement>;
}

const Progress = (props: ProgressProps) => {
  const { value = 0, size = 'm', background = true, className, barClassName, ref: externalRef, ...rest } = props;

  const percent = Math.min(100, Math.max(0, value));

  return (
    <div
      {...rest}
      ref={externalRef}
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      className={clsx(
        'pbc pbc:relative pbc:w-full pbc:overflow-hidden pbc:rounded-999',
        size === 'xs' && 'pbc:h-1',
        size === 's' && 'pbc:h-2',
        size === 'm' && 'pbc:h-4',
        size === 'l' && 'pbc:h-8',
        background && 'pbc:bg-secondary-200',
        className,
      )}
    >
      <div
        className={clsx(
          'pbc pbc:absolute pbc:inset-y-0 pbc:left-0 pbc:rounded-999 pbc:bg-primary-300 pbc:transition-[width] pbc:duration-150',
          barClassName,
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

Progress.displayName = 'Progress';
export default Progress;
