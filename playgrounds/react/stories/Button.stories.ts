import { Meta, StoryObj } from '@storybook/react';

import { Button as Component } from '@pbcomponents/react';
import { getIconsArg } from './arg-types';

const meta = {
  title: 'Components/Button',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    leftIcon: getIconsArg(),
    rightIcon: getIconsArg(),
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
    href: { control: 'text' },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    children: 'Button',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 's',
    theme: 'filled',
    color: 'primary',
    disabled: false,
    loading: false,
    href: undefined,
  },
};
