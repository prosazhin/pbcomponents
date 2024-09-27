import { Meta, StoryObj } from '@storybook/react';

import { InlineRadioGroup as Component, InlineRadio } from '@pbcomponents/react';
import { radioGroupArg } from '../../args';

const meta = {
  title: 'Components/Inline Radio Group/Inline Radio Group',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(radioGroupArg),
    children: {
      type: 'InlineRadio[]',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <InlineRadio key={index} value={value}>
        {value}
      </InlineRadio>
    )),
    size: 'm',
    disabled: false,
    defaultValue: 'One',
    name: '',
    form: '',
    onChange: () => {},
    className: '',
  },
  render: ({ children, size, className, defaultValue, disabled, onChange, name, form }) => (
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
