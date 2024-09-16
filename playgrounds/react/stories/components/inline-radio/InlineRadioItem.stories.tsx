import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { InlineRadioItem as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'InlineRadioItem';

const meta = {
  title: 'Components/Inline Radio/Inline Radio Item',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    leftIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: { type: 'select' },
    },
    rightIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: { type: 'select' },
    },
    className: { control: 'text' },
  },
  args: {
    label: 'Label',
    size: 'm',
    leftIcon: undefined,
    rightIcon: undefined,
    checked: false,
    disabled: false,
    onChange: () => {},
    className: '',
  },
  render: ({ label, leftIcon, rightIcon, size, checked, disabled, onChange, className }) => (
    <Component
      label={label}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      size={size}
      checked={checked}
      disabled={disabled}
      className={className ? className : undefined}
      onChange={onChange}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
