import { Meta, StoryObj } from '@storybook/react';

import { Collapse as Component } from '@pbcomponents/react';
import { classNameArg } from '../../args';

const meta = {
  title: 'Components/Collapse/Collapse',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    children: {
      control: 'text',
      type: 'React.ReactNode',
      defaultValue: { summary: undefined },
    },
    summary: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    open: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
  },
  args: {
    children: 'Collapse item content',
    summary: 'Summary',
    open: false,
    className: '',
  },
  render: ({ children, className, summary, open }) => (
    <Component open={open} summary={summary} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
