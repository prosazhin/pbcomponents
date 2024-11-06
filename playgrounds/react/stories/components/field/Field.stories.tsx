import { Meta, StoryObj } from '@storybook/react';

import { Field as Component, Input, Textarea } from '@pbcomponents/react';
import { fieldArg } from '../../args';

const meta = {
  title: 'Components/Field/Field',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(fieldArg),
    children: {
      options: ['Input', 'Textarea', 'X2', 'X3'],
      control: 'select',
      mapping: {
        Input: <Input value='' placeholder='Placeholder' />,
        Textarea: <Textarea value='' placeholder='Placeholder' />,
        X2: ['One', 'Two'].map((value, index) => <Input value='' key={index} placeholder={`Placeholder ${value}`} />),
        X3: ['One', 'Two', 'Three'].map((value, index) => <Input value='' key={index} placeholder={`Placeholder ${value}`} />),
      },
      defaultValue: { summary: undefined },
      type: 'Input | Textarea',
    },
  },
  args: {
    // @ts-expect-error: Unreachable code error
    children: 'Input',
    label: 'Label',
    description: 'Description',
    error: false,
    className: '',
  },
  render: ({ children, className, label, description, error }) => (
    <Component
      label={label ? label : undefined}
      description={description ? description : undefined}
      error={error}
      className={className ? className : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
