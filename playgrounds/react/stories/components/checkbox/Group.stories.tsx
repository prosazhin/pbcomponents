import { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxGroup as Component } from '@pbcomponents/react';
import { checkboxGroupArg } from '../../args';

const meta = {
  title: 'Components/Checkbox/CheckboxGroup',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(checkboxGroupArg),
    children: {
      control: 'object',
      type: 'Checkbox[]',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => <Checkbox key={index}>{value}</Checkbox>),
    size: 'm',
    disabled: false,
    defaultValue: ['One'],
    onChange: () => {},
    className: '',
  },
  render: ({ children, size, className, disabled, defaultValue, onChange, name, form }) => (
    <Component
      size={size}
      name={name ? name : undefined}
      form={form ? form : undefined}
      className={className ? className : undefined}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};