import { ComponentWithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props = ComponentWithIconsType & {
  size: 's' | 'm';
  theme: 'filled' | 'light' | 'border';
  color: 'primary' | 'secondary' | 'success' | 'danger';
};

const Badge = ({ children, className, leftIcon, rightIcon, size, theme, color }: Props) => (
  <button
    className={clsx(
      'pbc pbc-rounded-999 pbc-flex-inline !pbc-cursor-default',
      size === 's' && 'pbc-py-4 pbc-px-8 pbc-h-26',
      size === 'm' && 'pbc-py-8 pbc-px-12 pbc-h-[34px]',
      theme === 'filled' && 'pbc-text-white',
      theme === 'filled' && color === 'primary' && 'pbc-bg-primary-main',
      theme === 'filled' && color === 'secondary' && 'pbc-bg-secondary-main',
      theme === 'filled' && color === 'success' && 'pbc-bg-success-main',
      theme === 'filled' && color === 'danger' && 'pbc-bg-danger-main',
      theme !== 'filled' && color === 'primary' && 'pbc-text-primary-darker',
      theme !== 'filled' && color === 'secondary' && 'pbc-text-basic-main',
      theme !== 'filled' && color === 'success' && 'pbc-text-success-darker',
      theme !== 'filled' && color === 'danger' && 'pbc-text-danger-darker',
      theme === 'light' && color === 'primary' && 'pbc-bg-primary-lighter',
      theme === 'light' && color === 'secondary' && 'pbc-bg-secondary-lighter',
      theme === 'light' && color === 'success' && 'pbc-bg-success-lighter',
      theme === 'light' && color === 'danger' && 'pbc-bg-danger-lighter',
      theme === 'border' && 'pbc-border-1',
      theme === 'border' && color === 'primary' && 'pbc-border-primary-main',
      theme === 'border' && color === 'secondary' && 'pbc-border-secondary-main',
      theme === 'border' && color === 'success' && 'pbc-border-success-main',
      theme === 'border' && color === 'danger' && 'pbc-border-danger-main',
      className,
    )}
    type='button'
  >
    <Content size='s' leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {children}
    </Content>
  </button>
);

export default Badge;
