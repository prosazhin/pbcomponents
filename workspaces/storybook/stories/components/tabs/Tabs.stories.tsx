import { Tabs as Component, Container, Tab } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tabs/Tabs',
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
    children: {
      control: 'object',
      table: { type: { summary: 'Tab[]' } },
      defaultValue: { summary: undefined },
    },
    defaultIndex: {
      control: 'number',
      defaultValue: { summary: 0 },
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(index: number, event: Event) => void' } },
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <Tab key={index} label={value}>
        <div style={{ marginTop: '24px' }}>{`Content for "${value}" tab`}</div>
      </Tab>
    )),
    defaultIndex: 0,
    onChange: () => {},
    className: '',
  },
  render: ({ children, className, defaultIndex, onChange }) => (
    <Component className={className ? className : undefined} defaultIndex={defaultIndex} onChange={onChange}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tabs: Story = {};
