import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Button, ButtonGroup as Component, Container, Popover } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
      table: { type: { summary: 'Button[] | Popover[]' } },
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: data.map((value, index) => {
      if (index === data.length - 1) {
        return (
          <Popover key={index} placement='bottom-end'>
            <Popover.Trigger>
              <Button theme='border' rightIcon={ChevronUpDownIcon}>
                {value}
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Item>One</Popover.Item>
              <Popover.Item>Two</Popover.Item>
              <Popover.Item>Three</Popover.Item>
            </Popover.Content>
          </Popover>
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
