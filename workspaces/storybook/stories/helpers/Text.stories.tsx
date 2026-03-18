import { Text as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Helpers/Text',
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
      options: ['s', 'm', 'l'],
      control: 'radio',
      defaultValue: { summary: 'm' },
    },
    medium: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
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
    children: 'Label',
    size: 'm',
    medium: false,
    className: '',
  },
  render: ({ as, children, size, medium, className }) => (
    <Component as={as} size={size} medium={medium} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {};
