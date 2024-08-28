import { Meta, StoryObj } from '@storybook/react';

import { Tag as Component } from '@pbcomponents/react';
import { getIconsArg } from './arg-types';

const meta = {
  title: 'Components/Tag',
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
    href: { control: 'text' },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tag: Story = {
  args: {
    children: 'Tag',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 's',
    theme: 'light',
    checked: false,
    disabled: false,
    loading: false,
    href: undefined,
  },
};
