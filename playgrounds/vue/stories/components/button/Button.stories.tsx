import { Button as Component } from '@pbcomponents/vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Components/Button/Button',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
