import { Meta, StoryObj } from '@storybook/react';

import { Radio as Component } from '../src';

const meta: Meta<typeof Component> = {
  title: 'Helpers/Radio',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    disabled: {
      control: 'boolean',
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Radio: Story = {
  args: {
    children: 'Radio',
    size: 'm',
  },
};
