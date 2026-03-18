import { Checkbox, CheckboxGroup as Component, Container, Switch } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Checkbox/CheckboxGroup',
  component: Component,
  decorators: [
    (Story) => (
      <Container size='s'>
        <div style={{ paddingTop: '40px' }}>
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    size: {
      options: ['s', 'm'],
      control: 'radio',
      defaultValue: { summary: 'm' },
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    defaultValue: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'string[]' } },
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(value: string[]) => void' } },
    },
    children: {
      options: ['Checkbox', 'Switch'],
      control: 'select',
      mapping: {
        Checkbox: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => <Checkbox key={index}>{value}</Checkbox>),
        Switch: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => <Switch key={index}>{value}</Switch>),
      },
      defaultValue: { summary: undefined },
      table: { type: { summary: 'Checkbox[] | Switch[]' } },
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

export const CheckboxGroup: Story = {};
