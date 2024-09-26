'use client';

import Icon from '@/components/helpers/icon';
import Text from '@/components/helpers/text';
import { MediumType, SMLSizeType, SpanHTMLAttributes, SpanType, WithIconsType } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type BaseContentProps = SpanHTMLAttributes & WithIconsType & MediumType & SMLSizeType;

export interface ContentProps extends BaseContentProps {}

const Content = forwardRef<SpanType, ContentProps>((props, ref) => {
  const { children, className, size = 'm', medium = false, leftIcon: LeftIcon, rightIcon: RightIcon, ...rest } = props;

  return (
    <span
      ref={ref}
      {...rest}
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
      {RightIcon && <Icon tag={RightIcon} size={size} />}
    </span>
  );
});

Content.displayName = 'Content';

export default Content;
