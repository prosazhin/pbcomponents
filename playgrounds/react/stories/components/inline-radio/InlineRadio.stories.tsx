import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { InlineRadio as Component } from '@pbcomponents/react';
import { radioArg } from '../../args';

const meta = {
  title: 'Components/Inline Radio/InlineRadio',
  component: Component,
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
    onChange: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({
    children,
    value,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    size,
    checked,
    disabled,
    onChange,
    className,
    textClassName,
    name,
  }) => (
    <Component
      value={value}
      size={size}
      checked={checked}
      disabled={disabled}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      name={name ? name : undefined}
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
