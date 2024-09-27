import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Button as Component } from '@pbcomponents/react';
import { buttonArg, hrefArg } from '../../../args';

const meta = {
  title: 'Components/Buttons/Button/Button Link',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(buttonArg),
    ...Object.assign(hrefArg),
  },
  args: {
    children: 'Button',
    size: 'm',
    theme: 'filled',
    color: 'primary',
    disabled: false,
    loading: false,
    href: '#',
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, color, disabled, loading, className, href }) => (
    <Component
      size={size}
      theme={theme}
      color={color}
      disabled={disabled}
      loading={loading}
      href={href}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
