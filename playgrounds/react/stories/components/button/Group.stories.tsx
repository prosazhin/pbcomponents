import { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonGroup as Component, Dropdown, DropdownItem } from '@pbcomponents/react';
import { classNameArg, sizeArg } from '../../args';

import '../../main.css';

const data = ['One', 'Two', 'Three'];

const meta = {
  title: 'Components/Button/ButtonGroup',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    ...Object.assign(sizeArg),
    children: {
      control: 'object',
      type: 'Button[] | Dropdown[]',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: data.map((value, index) => {
      if (index === data.length - 1) {
        return (
          <Dropdown key={index} button={<Button theme='border'>{value}</Button>}>
            <DropdownItem>One</DropdownItem>
            <DropdownItem>Two</DropdownItem>
            <DropdownItem>Three</DropdownItem>
          </Dropdown>
        );
      }

      return (
        <Button key={index} theme='border'>
          {value}
        </Button>
      );
    }),
    size: 'm',
    className: '',
  },
  render: ({ children, size, className }) => (
    <Component size={size} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
