import * as heroicons from '@heroicons/react/24/outline';
import { Content as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Helpers/Content',
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
    size: {
      options: [10, 12, 14, 16, 20, 24, 32],
      control: 'select',
      defaultValue: { summary: '16' },
    },
    medium: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    textClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    as: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: 'span' },
    },
    children: {
      control: 'text',
      table: { type: { summary: 'React.ReactNode' } },
      defaultValue: { summary: undefined },
    },
  },
  args: {
    as: 'span',
    children: 'Content',
    size: 16,
    medium: false,
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({ as, children, leftIcon, leftIconClassName, rightIcon, rightIconClassName, size, medium, className, textClassName }) => (
    <Component
      as={as}
      size={size}
      medium={medium}
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

export const Content: Story = {};
