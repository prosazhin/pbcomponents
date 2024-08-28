import { Meta, StoryObj } from '@storybook/react';

import { Text as Component } from '@pbcomponents/react';

const meta = {
  title: 'Helpers/Text',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    medium: { control: 'boolean' },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    children: 'label',
    size: 'm',
    medium: false,
  },
};
