import { ComponentType } from '@/types';
import clsx from 'clsx';

export type Props = ComponentType & {
  size: 's' | 'm' | 'l';
  medium?: boolean | never;
};

const Text = ({ children, className, size, medium }: Props) => (
  <span
    className={clsx(
      'pbc pbc-text-inherit',
      size === 's' && (medium ? 'pbc-text-tm12' : 'pbc-text-t12'),
      size === 'm' && (medium ? 'pbc-text-tm16' : 'pbc-text-t16'),
      size === 'l' && (medium ? 'pbc-text-tm20' : 'pbc-text-t20'),
      className,
    )}
  >
    {children}
  </span>
);

export default Text;
