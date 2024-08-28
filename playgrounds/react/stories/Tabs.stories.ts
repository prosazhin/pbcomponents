import { Meta, StoryObj } from '@storybook/react';

import { Tabs as Component } from '@pbcomponents/react';

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
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tabs: Story = {
  args: {
    options: ['1', '2', '3', '4'].map((item) => ({ title: `Tab #${item}` })),
    display: 'title',
    defaultIndex: 0,
  },
};
