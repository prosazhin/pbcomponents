import { Meta, StoryObj } from '@storybook/react';

import { InlineRadio as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'InlineRadio';

const meta = {
  title: 'Components/Inline Radio/Inline Radio',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeValue: { control: 'text' },
    className: { control: 'text' },
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
  },
  args: {
    size: 'm',
    activeValue: '2',
    options: ['1', '2', '3', '4'].map((item) => ({ label: `Label`, value: item })),
    onChange: () => {},
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
