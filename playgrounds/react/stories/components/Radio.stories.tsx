import { Meta, StoryObj } from '@storybook/react';

import { Radio as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Radio';

const meta = {
  title: 'Components/Radio',
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
    disabled: {
      control: 'boolean',
    },
    className: { control: 'text' },
  },
  args: {
    label: 'Radio',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    disabled: false,
    onChange: () => {},
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
