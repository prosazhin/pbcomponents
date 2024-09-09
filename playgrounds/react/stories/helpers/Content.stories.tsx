import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Content as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Content';

const meta = {
  title: 'Helpers/Content',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    leftIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: { type: 'select' },
    },
    rightIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: { type: 'select' },
    },
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
    medium: { control: 'boolean' },
  },
  args: {
    children: 'Content',
    leftIcon: undefined,
    rightIcon: undefined,
    size: 'm',
    medium: false,
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, medium, className }) => (
    <Component
      children={children}
      size={size}
      medium={medium}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
