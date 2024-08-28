import { Meta, StoryObj } from '@storybook/react';

import { Chekbox as Component } from '@pbcomponents/react';

const meta = {
  title: 'Components/Chekbox',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelPlace: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chekbox: Story = {
  args: {
    label: 'Chekbox',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    indeterminate: false,
    disabled: false,
    setChecked: () => {},
  },
};
