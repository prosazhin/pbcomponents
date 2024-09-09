import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tab as Component } from '@pbcomponents/react';

// @ts-expect-error: Unreachable code error
Component.displayName = 'Tab';

const meta = {
  title: 'Helpers/Tab/Link',
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
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    href: { control: 'text' },
  },
  args: {
    children: 'Tab',
    leftIcon: undefined,
    rightIcon: undefined,
    active: false,
    disabled: false,
    href: '#',
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, active, disabled, href, className }) => (
    <Component
      children={children}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      active={active}
      disabled={disabled}
      // @ts-expect-error: Unreachable code error
      href={href}
      className={className ? className : undefined}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
