import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tab as Component } from '@pbcomponents/react';
import { hrefArg, tabArg } from '../../../args';

const meta = {
  title: 'Components/Tabs/Tab/Tab Link',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(tabArg),
    ...Object.assign(hrefArg),
  },
  args: {
    label: 'Tab',
    active: false,
    disabled: false,
    href: '#',
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ label, leftIcon, rightIcon, active, disabled, href, className }) => (
    <Component
      label={label}
      active={active}
      disabled={disabled}
      href={href}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
