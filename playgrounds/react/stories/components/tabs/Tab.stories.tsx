import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/outline';
import { Tab as Component } from '@pbcomponents/react';
import { tabArg } from '../../args';

const meta = {
  title: 'Components/Tabs/Tab',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(tabArg),
  },
  args: {
    as: 'button',
    label: 'Tab',
    active: false,
    disabled: false,
    href: '#',
    target: '_self',
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({
    label,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    active,
    disabled,
    href,
    target,
    type,
    onClick,
    className,
    textClassName,
  }) => (
    <Component
      label={label}
      active={active}
      disabled={disabled}
      type={type}
      href={href}
      target={target}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      onClick={onClick}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
