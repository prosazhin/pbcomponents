import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Button as Component } from '@pbcomponents/react';
import { buttonArg, onClickArg, typeArg } from '../../../args';

const meta = {
  title: 'Components/Buttons/Button/Button',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(buttonArg),
    ...Object.assign(typeArg),
    ...Object.assign(onClickArg),
  },
  args: {
    children: 'Button',
    size: 'm',
    theme: 'filled',
    color: 'primary',
    disabled: false,
    loading: false,
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, color, disabled, loading, className, onClick, type }) => (
    <Component
      size={size}
      theme={theme}
      color={color}
      disabled={disabled}
      loading={loading}
      type={type}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      onClick={onClick}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
