import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tab as Component } from '@pbcomponents/react';
import { tabArg } from '../../args';

const meta = {
  title: 'Components/Tabs/Tab',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(tabArg),
  },
  args: {
    // @ts-expect-error: Unreachable code error
    as: 'button',
    label: 'Tab',
    active: false,
    disabled: false,
    href: '#',
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
    textClassName: '',
  },
  render: ({ label, leftIcon, rightIcon, active, disabled, href, type, onClick, className, textClassName }) => (
    <Component
      label={label}
      active={active}
      disabled={disabled}
      type={type}
      href={href}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      onClick={onClick}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
