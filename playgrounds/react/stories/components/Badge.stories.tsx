import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Badge as Component } from '@pbcomponents/react';
import { defaultArgs, iconsArg, SMSizeArg, textClassNameTypeArg } from '../args';

const meta = {
  title: 'Components/Badge',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(defaultArgs),
    ...Object.assign(SMSizeArg),
    ...Object.assign(iconsArg),
    ...Object.assign(textClassNameTypeArg),
    theme: {
      options: ['filled', 'light', 'border'],
      control: { type: 'radio' },
      defaultValue: { summary: 'filled' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
      defaultValue: { summary: 'primary' },
    },
  },
  args: {
    children: 'Badge',
    size: 'm',
    theme: 'filled',
    color: 'primary',
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
    textClassName: '',
  },
  render: ({ children, className, textClassName, size, theme, color, leftIcon, rightIcon }) => (
    <Component
      size={size}
      theme={theme}
      color={color}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
