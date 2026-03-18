import { Headline as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Headline',
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
    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: 'select',
      defaultValue: { summary: 'h1' },
      type: 'string',
    },
    children: {
      control: 'text',
      table: { type: { summary: 'React.ReactNode' } },
      defaultValue: { summary: undefined },
    },
  },
  args: {
    as: 'h1',
    children: 'Headline',
    className: '',
  },
  render: ({ as, children, className }) => (
    <Component as={as} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Headline: Story = {};
