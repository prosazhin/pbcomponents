import * as heroicons from '@heroicons/react/24/outline';
import { Badge as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Badge',
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
    size: {
      options: ['s', 'm'],
      control: 'radio',
      defaultValue: { summary: 'm' },
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
    textClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    theme: {
      options: ['filled', 'light', 'border'],
      control: { type: 'radio' },
      defaultValue: { summary: 'filled' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
      defaultValue: { summary: 'primary' },
    },
  },
  args: {
    children: 'Badge',
    size: 'm',
    theme: 'filled',
    color: 'primary',
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({ children, className, textClassName, size, theme, color, leftIcon, leftIconClassName, rightIcon, rightIconClassName }) => (
    <Component
      size={size}
      theme={theme}
      color={color}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Badge: Story = {};
