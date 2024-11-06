import { Meta, StoryObj } from '@storybook/react';

import { ArrowRightStartOnRectangleIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Badge, Button, Dropdown as Component, DropdownItem } from '@pbcomponents/react';
import { dropdownArg } from '../../args';

import '../../main.css';

const meta = {
  title: 'Components/Dropdown/Dropdown',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(dropdownArg),
    children: {
      control: 'object',
      type: 'DropdownItem[]',
      defaultValue: { summary: undefined },
    },
    button: {
      control: 'object',
      type: 'Button[]',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: [
      { children: 'My orders', badge: <Badge color='secondary'>2</Badge>, leftIcon: UserCircleIcon },
      { children: 'Profile setting', leftIcon: Cog6ToothIcon },
      { children: 'Sign out', borderTop: true, leftIcon: ArrowRightStartOnRectangleIcon },
    ].map((item, index) => <DropdownItem key={index} {...item} />),
    button: <Button>Dropdown Button</Button>,
    align: 'left',
    className: '',
    wrapperClassName: '',
  },
  render: ({ children, button, className, wrapperClassName, align }) => (
    <Component
      button={button}
      align={align}
      className={className ? className : undefined}
      wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
