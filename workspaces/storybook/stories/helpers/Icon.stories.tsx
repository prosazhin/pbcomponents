import * as heroicons from '@heroicons/react/24/outline';
import { Icon as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Helpers/Icon',
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
    size: {
      options: [12, 14, 16, 18, 20, 22, 24, 26, 32],
      control: 'select',
      defaultValue: { summary: '18' },
    },
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    tag: {
      options: Object.keys(heroicons),
      mapping: heroicons,
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'svg' } },
    },
  },
  args: {
    tag: heroicons.CheckIcon,
    size: 18,
    className: '',
  },
  render: ({ tag, size, className }) => <Component tag={tag} size={size} className={className ? className : undefined} />,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
