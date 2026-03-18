import { Button, ButtonGroup as Component, Container, Dropdown } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const data = ['One', 'Two', 'Three'];

const meta = {
  title: 'Components/Button/ButtonGroup',
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
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    size: {
      options: ['xs', 's', 'm', 'l'],
      control: 'radio',
      defaultValue: { summary: 'm' },
    },
    children: {
      control: 'object',
      table: { type: { summary: 'Button[] | Dropdown[]' } },
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: data.map((value, index) => {
      if (index === data.length - 1) {
        return (
          <Dropdown key={index}>
            <Dropdown.Trigger theme='border'>{value}</Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>One</Dropdown.Item>
              <Dropdown.Item>Two</Dropdown.Item>
              <Dropdown.Item>Three</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        );
      }

      return (
        <Button key={index} theme='border'>
          {value}
        </Button>
      );
    }),
    size: 'm',
    className: '',
  },
  render: ({ children, size, className }) => (
    <Component size={size} className={className ? className : undefined}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonGroup: Story = {};
