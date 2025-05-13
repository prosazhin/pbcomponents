import { Meta, StoryObj } from '@storybook/react';

import { Field as Component, Input, Search, Select, Textarea } from '@pbcomponents/react';
import { fieldArg } from '../../args';

import '../../main.css';

const meta = {
  title: 'Components/Field/Field',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(fieldArg),
    children: {
      options: ['Input', 'Textarea', 'Select', 'Search', 'X2', 'X3'],
      control: 'select',
      mapping: {
        Input: <Input value='' placeholder='Placeholder' />,
        Textarea: <Textarea value='' placeholder='Placeholder' />,
        Select: (
          <Select
            options={[
              {
                display: 'One',
                value: '0',
              },
              {
                display: 'Two',
                value: '1',
              },
              {
                display: 'Three',
                value: '2',
              },
              {
                display: 'Four',
                value: '3',
              },
              {
                display: 'Five',
                value: '4',
              },
            ]}
            placeholder='Placeholder'
          />
        ),
        Search: (
          <Search
            options={[
              {
                display: 'One',
                value: '0',
              },
              {
                display: 'Two',
                value: '1',
              },
              {
                display: 'Three',
                value: '2',
              },
              {
                display: 'Four',
                value: '3',
              },
              {
                display: 'Five',
                value: '4',
              },
            ]}
            placeholder='Placeholder'
          />
        ),
        X2: ['One', 'Two'].map((value, index) => <Input value='' key={index} placeholder={`Placeholder ${value}`} />),
        X3: ['One', 'Two', 'Three'].map((value, index) => <Input value='' key={index} placeholder={`Placeholder ${value}`} />),
      },
      defaultValue: { summary: undefined },
      type: 'Input | Textarea | Select | Search',
    },
  },
  args: {
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
