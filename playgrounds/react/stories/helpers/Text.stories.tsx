import { Meta, StoryObj } from '@storybook/react';

import { Text as Component } from '@pbcomponents/react';
import { classNameArg, mediumArg, SMLSizeArg } from '../args';

const meta = {
  title: 'Helpers/Text',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    ...Object.assign(SMLSizeArg),
    ...Object.assign(mediumArg),
    as: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: 'span' },
    },
    children: {
      control: 'text',
      type: 'React.ReactNode',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    as: 'span',
    children: 'Label',
    size: 'm',
    medium: false,
    className: '',
  },
  render: ({ as, children, size, medium, className }) => (
    <Component as={as} size={size} medium={medium} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
