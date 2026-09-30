import { Toggle as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Checkbox/Toggle',
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
    labelPlace: {
      options: ['left', 'right'],
      control: 'radio',
      defaultValue: { summary: 'right' },
      type: 'string',
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
  render: function Render(args) {
    const { value, children, description, labelPlace, size, disabled, className, wrapperClassName, textClassName } = args;
    const [{ checked }, setArgs] = useArgs();

    return (
      <Component
        value={value}
        description={description ? description : undefined}
        size={size}
        labelPlace={labelPlace}
        checked={checked}
        disabled={disabled}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        textClassName={textClassName ? textClassName : undefined}
        onChange={(newValue: boolean) => {
          setArgs({ checked: newValue });
        }}
      >
        {children}
      </Component>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Toggle: Story = {};
