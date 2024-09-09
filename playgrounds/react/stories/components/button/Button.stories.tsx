import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Button as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Button';

const meta = {
  title: 'Components/Button/Button',
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
      options: ['xs', 's', 'm', 'l'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['filled', 'light', 'border', 'ghost'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
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
    children: 'Button',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 's',
    theme: 'filled',
    color: 'primary',
    disabled: false,
    loading: false,
    type: 'button',
    onClick: () => {},
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, color, disabled, loading, className, onClick, type }) => (
    <Component
      children={children}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      size={size}
      theme={theme}
      color={color}
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
