'use client';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';
import { MediumType, PolymorphicProps, SMLSizeType, TextClassNameType, WithIconsType } from '@/types';
import clsx from 'clsx';

const defaultElement = 'span';

type BaseContentProps = WithIconsType & MediumType & SMLSizeType & TextClassNameType;
export interface ContentProps extends BaseContentProps {
  children?: React.ReactNode;
}

const Content = <Element extends React.ElementType = typeof defaultElement>(props: PolymorphicProps<Element, ContentProps>) => {
  const {
    as: Component = defaultElement,
    children,
    size = 'm',
    medium = false,
    leftIcon: LeftIcon,
    leftIconClassName,
    rightIcon: RightIcon,
    rightIconClassName,
    className,
    textClassName,
    ...rest
  } = props;

  return (
    <Component
      {...rest}
      className={clsx(
        'pbc pbc-inline-flex pbc-flex-nowrap pbc-items-center pbc-pointer-events-none pbc-select-none',
        size === 's' && 'pbc-gap-x-4',
        size === 'm' && 'pbc-gap-x-6',
        size === 'l' && 'pbc-gap-x-8',
        className,
      )}
    >
      {LeftIcon && <Icon tag={LeftIcon} size={size} className={leftIconClassName} />}
      {children && (
        <Text size={size} medium={medium} className={clsx('pbc-flex-1', textClassName)}>
          {children}
        </Text>
      )}
      {RightIcon && <Icon tag={RightIcon} size={size} className={rightIconClassName} />}
    </Component>
  );
};

Content.displayName = 'Content';

export default Content;
