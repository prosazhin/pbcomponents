import { Meta, StoryObj } from '@storybook/react';

import { Collapse, CollapseGroup as Component } from '@pbcomponents/react';
import { classNameArg } from '../../args';

const meta = {
  title: 'Components/Collapse/CollapseGroup',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    children: {
      control: 'object',
      type: 'Collapse[]',
      defaultValue: { summary: undefined },
    },
    name: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <Collapse key={index} summary={`Summary ${value}`} open={index === 0}>
        {value}
      </Collapse>
    )),
    name: 'preview',
    className: '',
  },
  render: ({ children, className, name }) => (
    <Component name={name} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
