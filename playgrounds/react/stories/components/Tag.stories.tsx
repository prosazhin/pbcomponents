import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tag as Component } from '@pbcomponents/react';
import { tagArg } from '../args';

const meta = {
  title: 'Components/Tag',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(tagArg),
  },
  args: {
    // @ts-expect-error: Unreachable code error
    as: 'button',
    children: 'Tag',
    size: 'm',
    theme: 'light',
    checked: false,
    disabled: false,
    loading: false,
    href: '#',
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
    textClassName: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, checked, disabled, loading, href, type, onClick, className, textClassName }) => (
    <Component
      size={size}
      theme={theme}
      checked={checked}
      disabled={disabled}
      loading={loading}
      type={type}
      href={href}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
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

export const S: Story = {};
