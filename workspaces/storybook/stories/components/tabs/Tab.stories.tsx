import * as heroicons from '@heroicons/react/24/outline';
import { Badge, Tab as Component, Container, type TabProps } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

// badge в панели — текст, из него собирается Badge
type StoryArgs = Omit<TabProps, 'badge'> & { badge?: string };

const meta = {
  title: 'Components/Tabs/Tab',
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
    badge: {
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
    leftIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'svg' } },
    },
    leftIconClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    rightIcon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'svg' } },
    },
    rightIconClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    active: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    theme: {
      options: ['line', 'pill', 'pill-secondary'],
      control: { type: 'radio' },
      defaultValue: { summary: 'line' },
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    type: {
      options: ['button', 'reset', 'submit'],
      control: 'radio',
      defaultValue: { summary: 'button' },
      type: 'string',
    },
    onClick: {
      defaultValue: { summary: undefined },
      table: { type: { summary: '(event: Event) => void' } },
    },
    href: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
    linkComponent: {
      control: false,
      defaultValue: { summary: 'a' },
      table: { type: { summary: 'React.ElementType' } },
    },
    target: {
      options: ['_self', '_blank'],
      control: 'radio',
      defaultValue: { summary: '_self' },
    },
    label: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    label: 'Tab',
    active: false,
    theme: 'line',
    badge: '',
    disabled: false,
    href: '#',
    target: '_self',
    type: 'button',
    onClick: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({
    label,
    badge,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    active,
    theme,
    disabled,
    href,
    target,
    type,
    onClick,
    className,
    textClassName,
  }) => (
    <Component
      label={label}
      badge={badge ? <Badge>{badge}</Badge> : undefined}
      active={active}
      theme={theme}
      disabled={disabled}
      type={type}
      href={href}
      target={target}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
      onClick={onClick}
    />
  ),
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tab: Story = {};
