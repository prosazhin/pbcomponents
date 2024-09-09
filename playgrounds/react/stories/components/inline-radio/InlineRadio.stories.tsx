import { Meta, StoryObj } from '@storybook/react';

import { InlineRadioItem as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'InlineRadio';

const meta = {
  title: 'Components/InlineRadio/InlineRadio',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    isActive: {
      control: 'boolean',
    },
    className: { control: 'text' },
  },
  args: {
    label: 'Inline Radio Item',
    size: 'm',
    checked: false,
    disabled: false,
    onChange: () => {},
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
