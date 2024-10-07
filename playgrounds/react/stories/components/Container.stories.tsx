import { Meta, StoryObj } from '@storybook/react';

import { Container as Component } from '@pbcomponents/react';
import { containerArg } from '../args';

const meta = {
  title: 'Components/Container',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(containerArg),
  },
  args: {
    children: <div>Container</div>,
    size: 'full',
    className: '',
  },
  render: ({ children, className, size }) => (
    <Component size={size} className={className ? className : undefined} style={{ backgroundColor: '#ECEFF1' }}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
