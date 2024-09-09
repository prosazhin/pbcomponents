import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tag as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Tag';

const meta = {
  title: 'Components/Tag/Button',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    leftIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: { type: 'select' },
    },
    rightIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['light', 'border'],
      control: { type: 'radio' },
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    type: { control: 'text' },
  },
  args: {
    children: 'Tag',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 's',
    theme: 'light',
    checked: false,
    disabled: false,
    loading: false,
    type: 'button',
    onClick: () => {},
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, checked, disabled, loading, type, onClick, className }) => (
    <Component
      children={children}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      size={size}
      theme={theme}
      checked={checked}
      disabled={disabled}
      loading={loading}
      type={type}
      className={className ? className : undefined}
      onClick={onClick}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
