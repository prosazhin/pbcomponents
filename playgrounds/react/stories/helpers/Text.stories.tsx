import { Meta, StoryObj } from '@storybook/react';

import { Text as Component } from '@pbcomponents/react';
import { defaultArgs, mediumArg, SMLSizeArg } from '../args';

const meta = {
  title: 'Helpers/Text',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(defaultArgs),
    ...Object.assign(SMLSizeArg),
    ...Object.assign(mediumArg),
  },
  args: {
    children: 'label',
    size: 'm',
    medium: false,
    className: '',
  },
  render: ({ children, size, medium, className }) => (
    <Component size={size} medium={medium} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
