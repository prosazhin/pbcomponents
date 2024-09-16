import { Meta, StoryObj } from '@storybook/react';

import { Tabs as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    activeValue: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    activeValue: '2',
    options: ['1', '2', '3', '4'].map((item) => ({ label: `Tab`, value: item, children: item })),
    onChange: () => {},
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
