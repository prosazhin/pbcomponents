import * as heroicons from '@heroicons/react/24/outline';
import { Badge, InlineRadio as Component, Container, type InlineRadioProps } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

// badge в панели — текст, из него собирается Badge
type StoryArgs = Omit<InlineRadioProps, 'badge'> & { badge?: string };

const meta = {
  title: 'Components/Inline Radio/InlineRadio',
  // args истории шире пропсов компонента (виртуальные поля для панели)
  component: Component as ComponentType<StoryArgs>,
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
    badge: {
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
    textClassName: {
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
  },
  args: {
    children: 'Label',
    rounded: false,
    badge: '',
    size: 'm',
    checked: false,
    disabled: false,
    value: '',
    onChange: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({
    children,
    rounded,
    badge,
    value,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    size,
    checked,
    disabled,
    onChange,
    className,
    textClassName,
    name,
  }) => (
    <Component
      value={value}
      rounded={rounded}
      badge={badge ? <Badge>{badge}</Badge> : undefined}
      size={size}
      checked={checked}
      disabled={disabled}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      name={name ? name : undefined}
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineRadio: Story = {};
