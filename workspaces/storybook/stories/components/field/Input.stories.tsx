import * as heroicons from '@heroicons/react/24/outline';
import { Button, Input as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Field/Input',
  component: Component,
  decorators: [
    (Story) => (
      <Container size='s'>
        <Container.Main>
          <div style={{ paddingTop: '40px' }}>
            <Story />
          </div>
        </Container.Main>
      </Container>
    ),
  ],
  argTypes: {
    className: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    wrapperClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    size: { options: ['s', 'm'], control: 'radio', defaultValue: { summary: 'm' } },
    leftIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'svg' } },
    },
    leftIconClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    rightIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'svg' } },
    },
    rightIconClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    disabled: { control: 'boolean', defaultValue: { summary: 'false' } },
    error: { control: 'boolean', defaultValue: { summary: 'false' } },
    value: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    placeholder: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    addonAlign: {
      options: ['left', 'right'],
      control: 'radio',
      defaultValue: { summary: 'left' },
    },
    type: {
      options: ['text', 'number', 'email', 'password', 'url', 'tel', 'search', 'date', 'datetime-local', 'month', 'week', 'time'],
      control: 'select',
      defaultValue: { summary: 'text' },
      type: 'string',
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(value: string, event: Event) => void' } },
    },
    addon: {
      options: [
        undefined,
        <Button color='secondary' theme='border'>
          Button
        </Button>,
      ],
      control: {
        type: 'select',
        labels: {
          undefined,
          '[object Object]': 'Button',
        },
      },
      defaultValue: { summary: undefined },
      table: { type: { summary: 'ReactNode' } },
    },
  },
  args: {
    size: 'm',
    disabled: false,
    error: false,
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    onChange: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    addon: undefined,
    addonAlign: 'left',
    className: '',
    wrapperClassName: '',
  },
  render: function Render(args) {
    const {
      size,
      disabled,
      error,
      placeholder,
      onChange,
      leftIcon,
      leftIconClassName,
      rightIcon,
      rightIconClassName,
      addon,
      addonAlign,
      className,
      wrapperClassName,
      type,
    } = args;
    const [{ value }, setArgs] = useArgs();

    return (
      <Component
        size={size}
        disabled={disabled}
        error={error}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
      >
        {addon && addonAlign === 'left' && <Component.LeftAddon>{addon}</Component.LeftAddon>}
        <Component.Control
          value={value ? value : ''}
          placeholder={placeholder ? placeholder : undefined}
          type={type}
          // @ts-expect-error: icon map
          leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
          leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
          // @ts-expect-error: icon map
          rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
          rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
          onChange={(v: string, event: React.ChangeEvent<HTMLInputElement>) => {
            setArgs({ value: v });
            if (onChange) onChange(v, event);
          }}
        />
        {addon && addonAlign === 'right' && <Component.RightAddon>{addon}</Component.RightAddon>}
      </Component>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Input: Story = {};
