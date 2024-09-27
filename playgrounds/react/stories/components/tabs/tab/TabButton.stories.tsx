import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tab as Component } from '@pbcomponents/react';
import { onClickArg, tabArg, typeArg } from '../../../args';

const meta = {
  title: 'Components/Tabs/Tab/Tab Button',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(tabArg),
    ...Object.assign(typeArg),
    ...Object.assign(onClickArg),
  },
  args: {
    label: 'Tab',
    active: false,
    disabled: false,
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ label, leftIcon, rightIcon, active, disabled, type, onClick, className }) => (
    <Component
      label={label}
      active={active}
      disabled={disabled}
      type={type}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      onClick={onClick}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
