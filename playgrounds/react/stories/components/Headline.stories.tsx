import { Meta, StoryObj } from '@storybook/react';

import { Headline as Component } from '@pbcomponents/react';
import { headlineArg } from '../args';

const meta = {
  title: 'Components/Headline',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(headlineArg),
  },
  args: {
    as: 'h1',
    children: 'Headline',
    className: '',
  },
  render: ({ as, children, className }) => (
    <Component as={as} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
