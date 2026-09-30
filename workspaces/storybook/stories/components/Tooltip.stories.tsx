import { Button, Tooltip as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Tooltip',
  component: Component,
  decorators: [
    (Story) => (
      <Container size='s'>
        <div style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    content: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    placement: {
      options: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      control: 'select',
      defaultValue: { summary: 'top' },
    },
    arrow: {
      control: 'boolean',
      defaultValue: { summary: 'true' },
    },
    delay: {
      control: 'number',
      defaultValue: { summary: '200' },
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    children: {
      control: 'object',
      table: { type: { summary: 'ReactElement' } },
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: <Button>Hover me</Button>,
    content: 'Tooltip text',
    placement: 'top',
    arrow: true,
    delay: 200,
    disabled: false,
  },
  render: ({ children, content, placement, arrow, delay, disabled }) => (
    <Component content={content} placement={placement} arrow={arrow} delay={delay} disabled={disabled}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tooltip: Story = {};
