import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tag as Component } from '@pbcomponents/react';
import { onClickArg, tagArg, typeArg } from '../../args';

const meta = {
  title: 'Components/Tag/Tag Button',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(tagArg),
    ...Object.assign(typeArg),
    ...Object.assign(onClickArg),
  },
  args: {
    children: 'Tag',
    size: 's',
    theme: 'light',
    checked: false,
    disabled: false,
    loading: false,
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, checked, disabled, loading, type, onClick, className }) => (
    <Component
      size={size}
      theme={theme}
      checked={checked}
      disabled={disabled}
      loading={loading}
      type={type}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      onClick={onClick}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
