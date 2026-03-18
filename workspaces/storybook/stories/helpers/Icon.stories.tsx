import * as heroicons from '@heroicons/react/24/outline';
import { Icon as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

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
      options: ['s', 'm', 'l'],
      control: 'radio',
      defaultValue: { summary: 'm' },
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
    size: 'm',
    className: '',
  },
  render: ({ tag, size, className }) => <Component tag={tag} size={size} className={className ? className : undefined} />,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
