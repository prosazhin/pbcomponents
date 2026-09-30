import { Radio as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Radio/Radio',
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
    description: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    children: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
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
    checked: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    value: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(checked: boolean, value: string, event: Event) => void' } },
    },
    labelPlace: {
      options: ['left', 'right'],
      control: 'radio',
      defaultValue: { summary: 'right' },
      type: 'string',
    },
    wrapperClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    textClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: 'Label',
    description: '',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    disabled: false,
    value: '',
    onChange: () => {},
    className: '',
    wrapperClassName: '',
    textClassName: '',
  },
  render: ({
    children,
    description,
    checked,
    value,
    labelPlace,
    size,
    disabled,
    className,
    wrapperClassName,
    textClassName,
    name,
    onChange,
  }) => (
    <Component
      description={description ? description : undefined}
      value={value}
      size={size}
      labelPlace={labelPlace}
      checked={checked}
      disabled={disabled}
      className={className ? className : undefined}
      wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
      textClassName={textClassName ? textClassName : undefined}
      name={name ? name : undefined}
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radio: Story = {};
