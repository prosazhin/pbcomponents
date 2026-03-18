import { Checkbox as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Checkbox/Checkbox',
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
    indeterminate: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
  },
  args: {
    children: 'Label',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    indeterminate: false,
    disabled: false,
    value: '',
    onChange: () => {},
    className: '',
    wrapperClassName: '',
    textClassName: '',
  },
  render: function Render(args) {
    const { value, children, labelPlace, size, disabled, className, wrapperClassName, textClassName } = args;
    const [{ checked, indeterminate }, setArgs] = useArgs();

    return (
      <Component
        value={value}
        size={size}
        labelPlace={labelPlace}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        textClassName={textClassName ? textClassName : undefined}
        onChange={(newValue: boolean) => {
          if (!indeterminate && !checked) {
            setArgs({ checked: newValue, indeterminate: !indeterminate });
          }
          if (indeterminate && checked) {
            setArgs({ indeterminate: !indeterminate });
          }
          if (!indeterminate && checked) {
            setArgs({ checked: newValue });
          }
        }}
      >
        {children}
      </Component>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {};
