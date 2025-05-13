import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/outline';
import { Tag as Component } from '@pbcomponents/react';
import { tagArg } from '../args';

const meta = {
  title: 'Components/Tag',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(tagArg),
  },
  args: {
    as: 'button',
    children: 'Tag',
    size: 'm',
    theme: 'light',
    checked: false,
    disabled: false,
    loading: false,
    href: '#',
    target: '_self',
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({
    children,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    size,
    theme,
    checked,
    disabled,
    loading,
    href,
    target,
    type,
    onClick,
    className,
    textClassName,
  }) => (
    <Component
      size={size}
      theme={theme}
      checked={checked}
      disabled={disabled}
      loading={loading}
      type={type}
      href={href}
      target={target}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      onClick={onClick}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
