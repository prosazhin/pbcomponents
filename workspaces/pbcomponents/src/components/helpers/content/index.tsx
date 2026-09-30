'use client';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';
import { IconSize, MediumType, PolymorphicProps, TextClassNameType, TextSize, TextSizeType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { ElementType, ReactNode } from 'react';

const defaultElement = 'span';

// размер иконки под размер шрифта — как в .content в фигме
const CONTENT_ICON_SIZE: Record<TextSize, IconSize> = { 10: 12, 12: 14, 14: 16, 16: 18, 20: 22, 24: 26, 32: 32 };

type BaseContentProps = WithIconsType & MediumType & TextSizeType & TextClassNameType;
export interface ContentProps extends BaseContentProps {
  children?: ReactNode;
}

const Content = <Element extends ElementType = typeof defaultElement>(props: PolymorphicProps<Element, ContentProps>) => {
  const {
    as: Component = defaultElement,
    children,
    size = 16,
    medium = false,
    leftIcon: LeftIcon,
    leftIconClassName,
    rightIcon: RightIcon,
    rightIconClassName,
    className,
    textClassName,
    ...rest
  } = props;

  const iconSize = CONTENT_ICON_SIZE[size];

  return (
    <Component
      {...rest}
      className={clsx(
        'pbc pbc:inline-flex pbc:flex-nowrap pbc:items-center pbc:justify-center',
        // минимальный размер — высота строки, как в .content в фигме: кнопка с одной иконкой получается квадратной
        size === 10 && 'pbc:gap-x-2 pbc:min-w-16 pbc:min-h-16',
        size === 12 && 'pbc:gap-x-4 pbc:min-w-18 pbc:min-h-18',
        size === 14 && 'pbc:gap-x-6 pbc:min-w-22 pbc:min-h-22',
        size === 16 && 'pbc:gap-x-8 pbc:min-w-24 pbc:min-h-24',
        size === 20 && 'pbc:gap-x-8 pbc:min-w-30 pbc:min-h-30',
        size === 24 && 'pbc:gap-x-10 pbc:min-w-36 pbc:min-h-36',
        size === 32 && 'pbc:gap-x-12 pbc:min-w-48 pbc:min-h-48',
        className,
      )}
    >
      {LeftIcon && <Icon tag={LeftIcon} size={iconSize} className={leftIconClassName} />}
      {children && (
        <Text size={size} medium={medium} className={clsx('pbc:flex-1', textClassName)}>
          {children}
        </Text>
      )}
      {RightIcon && <Icon tag={RightIcon} size={iconSize} className={rightIconClassName} />}
    </Component>
  );
};

Content.displayName = 'Content';
export default Content;
