import { InlineRadioGroup as Component, Container, InlineRadio } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Inline Radio/InlineRadioGroup',
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
    rounded: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
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
      control: 'text',
      defaultValue: { summary: undefined },
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(value: string) => void' } },
    },
    children: {
      control: 'object',
      table: { type: { summary: 'InlineRadio[]' } },
      defaultValue: { summary: undefined },
    },
  },
  args: {
    rounded: false,
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <InlineRadio key={index} value={value}>
        {value}
      </InlineRadio>
    )),
    size: 'm',
    disabled: false,
    defaultValue: 'One',
    onChange: () => {},
    className: '',
  },
  render: ({ children, rounded, size, className, defaultValue, disabled, onChange, name, form }) => (
    <Component
      rounded={rounded}
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

export const InlineRadioGroup: Story = {};
