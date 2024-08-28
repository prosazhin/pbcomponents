import { Meta, StoryObj } from '@storybook/react';

import { Icon as Component } from '@pbcomponents/react';
import { getIconsArg } from './arg-types';

const meta = {
  title: 'Helpers/Icon',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    name: getIconsArg(),
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    name: 'CheckCircleIcon',
    size: 'm',
  },
};
