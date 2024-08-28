import { Meta, StoryObj } from '@storybook/react';

import { Tab as Component } from '@pbcomponents/react';
import { getIconsArg } from './arg-types';

const meta = {
  title: 'Helpers/Tab',
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
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    href: { control: 'text' },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Badge: Story = {
  args: {
    children: 'Tab',
    leftIcon: undefined,
    rightIcon: undefined,
    active: false,
    disabled: false,
    href: undefined,
  },
};
