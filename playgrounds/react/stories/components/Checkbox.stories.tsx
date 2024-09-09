import { Meta, StoryObj } from '@storybook/react';

import { Checkbox as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Checkbox';

const meta = {
  title: 'Components/Checkbox',
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
  args: {
    label: 'Checkbox',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    indeterminate: false,
    disabled: false,
    onChange: () => {},
    className: '',
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
