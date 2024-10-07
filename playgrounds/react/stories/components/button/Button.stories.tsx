import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Button as Component } from '@pbcomponents/react';
import { buttonArg } from '../../args';

const meta = {
  title: 'Components/Button/Button',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(buttonArg),
  },
  args: {
    // @ts-expect-error: Unreachable code error
    as: 'button',
    children: 'Button',
    size: 'm',
    theme: 'filled',
    color: 'primary',
    disabled: false,
    loading: false,
    href: '#',
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
    textClassName: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, color, disabled, loading, className, textClassName, onClick, type, href }) => (
    <Component
      size={size}
      theme={theme}
      color={color}
      disabled={disabled}
      loading={loading}
      type={type}
      href={href}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      onClick={onClick}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
