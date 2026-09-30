import { Progress as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Progress',
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
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      defaultValue: { summary: '0' },
    },
    size: {
      options: ['xs', 's', 'm', 'l'],
      control: 'radio',
      defaultValue: { summary: 'm' },
    },
    background: {
      control: 'boolean',
      defaultValue: { summary: 'true' },
    },
    className: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    barClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
  },
  args: {
    value: 68,
    size: 'm',
    background: true,
    className: '',
    barClassName: '',
  },
  render: ({ value, size, background, className, barClassName }) => (
    <Component
      value={value}
      size={size}
      background={background}
      className={className ? className : undefined}
      barClassName={barClassName ? barClassName : undefined}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Progress: Story = {};
