import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Icon as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Icon';

export type Props = {
  className?: string | never;
  tag: string;
  size: 's' | 'm' | 'l';
};

const meta = {
  title: 'Helpers/Icon',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    tag: {
      options: Object.keys(heroicons),
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
  args: {
    // @ts-expect-error: Unreachable code error
    tag: 'CheckIcon',
    size: 'm',
    className: '',
  },
  // @ts-expect-error: Unreachable code error
  render: ({ tag, size, className }) => <Component tag={heroicons[tag]} size={size} className={className ? className : undefined} />,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
