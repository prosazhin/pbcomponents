import { Meta, StoryObj } from '@storybook/react';

import { Tabs as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    display: { control: 'text' },
    defaultIndex: { control: 'number' },
    className: { control: 'text' },
  },
  args: {
    options: ['1', '2', '3', '4'].map((item) => ({ title: `Tab #${item}` })),
    // @ts-expect-error: Unreachable code error
    display: 'title',
    defaultIndex: 0,
    onChange: () => {},
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
