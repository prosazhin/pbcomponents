import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { InlineRadio as Component } from '@pbcomponents/react';
import { radioArg } from '../../args';

const meta = {
  title: 'Components/Inline Radio Group/Inline Radio',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(radioArg),
  },
  args: {
    children: 'Label',
    size: 'm',
    checked: false,
    disabled: false,
    value: '',
    name: '',
    onChange: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, value, leftIcon, rightIcon, size, checked, disabled, onChange, className, name }) => (
    <Component
      value={value}
      size={size}
      checked={checked}
      disabled={disabled}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      name={name ? name : undefined}
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
