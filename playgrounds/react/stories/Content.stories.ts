import { Meta, StoryObj } from '@storybook/react';

import { Content as Component } from '@pbcomponents/react';
import { getIconsArg } from './arg-types';

const meta = {
  title: 'Helpers/Content',
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
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    medium: { control: 'boolean' },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Content: Story = {
  args: {
    children: 'Content',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 'm',
    medium: false,
  },
};
