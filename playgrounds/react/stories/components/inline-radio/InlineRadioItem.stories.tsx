import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { InlineRadioItem as Component } from '@pbcomponents/react';
import { checkedArg, defaultArgs, disabledArg, iconsArg, SMSizeArg } from '../../args';

const meta = {
  title: 'Components/Inline Radio/Inline Radio Item',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(defaultArgs),
    ...Object.assign(SMSizeArg),
    ...Object.assign(iconsArg),
    ...Object.assign(checkedArg),
    ...Object.assign(disabledArg),
    value: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    onChange: {
      defaultValue: { summary: undefined },
      type: '(value, event) => void',
    },
  },
  args: {
    children: 'Label',
    value: '',
    size: 'm',
    checked: false,
    disabled: false,
    onChange: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, value, leftIcon, rightIcon, size, checked, disabled, onChange, className }) => (
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
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
