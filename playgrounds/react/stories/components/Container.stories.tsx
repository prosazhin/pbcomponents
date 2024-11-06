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
    leftAside: <div>Left Aside</div>,
    leftAsideClassName: '',
    rightAside: <div>Right Aside</div>,
    rightAsideClassName: '',
    className: '',
  },
  render: ({ children, className, size, leftAside, leftAsideClassName, rightAside, rightAsideClassName }) => (
    <Component
      size={size}
      className={className ? className : undefined}
      leftAside={leftAside ? <div>Left Aside</div> : undefined}
      leftAsideClassName={leftAsideClassName ? leftAsideClassName : undefined}
      rightAside={rightAside ? <div>Left Aside</div> : undefined}
      rightAsideClassName={rightAsideClassName ? rightAsideClassName : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
