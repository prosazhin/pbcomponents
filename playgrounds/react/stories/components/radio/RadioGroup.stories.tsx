import { Meta, StoryObj } from '@storybook/react';

import { RadioGroup as Component, Radio } from '@pbcomponents/react';
import { radioGroupArg } from '../../args';

const meta = {
  title: 'Components/Radio/Radio Group',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(radioGroupArg),
    children: {
      control: 'object',
      type: 'Radio[]',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <Radio key={index} value={value}>
        {value}
      </Radio>
    )),
    size: 'm',
    disabled: false,
    defaultValue: 'One',
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

export const S: Story = {};
