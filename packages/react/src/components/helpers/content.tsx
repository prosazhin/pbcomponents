import { ComponentWithIconsType } from '@/types';
import clsx from 'clsx';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';

export type Props = ComponentWithIconsType & {
  size: 's' | 'm' | 'l';
  medium?: boolean | never;
};

const Content = ({ children, className, leftIcon: LeftIcon, rightIcon: RightIcon, size, medium }: Props) => (
  <span
    className={clsx(
      'pbc pbc-flex-inline',
      size === 's' && 'pbc-gap-x-4',
      size === 'm' && 'pbc-gap-x-6',
      size === 'l' && 'pbc-gap-x-8',
      className,
    )}
  >
    {LeftIcon && <Icon tag={LeftIcon} size={size} />}
    {children && (
      <Text size={size} medium={medium}>
        {children}
      </Text>
    )}
    {RightIcon && children && <Icon tag={RightIcon} size={size} />}
  </span>
);

export default Content;
