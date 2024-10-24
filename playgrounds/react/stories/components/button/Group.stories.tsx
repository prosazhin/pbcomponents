import { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonGroup as Component } from '@pbcomponents/react';
import { classNameArg, sizeArg } from '../../args';

const meta = {
  title: 'Components/Button/ButtonGroup',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    ...Object.assign(sizeArg),
    children: {
      control: 'object',
      type: 'Button[]',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: ['One', 'Two', 'Three'].map((value, index) => (
      <Button key={index} theme='border'>
        {value}
      </Button>
    )),
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
