import { ArrowRightStartOnRectangleIcon, ChevronUpDownIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Badge, Button, Popover as Component, Container, type PopoverProps, Text } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// search включает поиск в Popover.Content
type StoryArgs = PopoverProps & { search?: boolean };

const meta = {
  title: 'Components/Popover/Popover',
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
    placement: {
      options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'left', 'right'],
      control: 'select',
      defaultValue: { summary: 'bottom-start' },
    },
    portal: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    defaultOpen: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    search: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      table: { type: { summary: '{ value: string; onChange: (value: string) => void; placeholder?: string }' } },
    },
    onOpenChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(value: boolean) => void' } },
    },
  },
  args: {
    placement: 'bottom-start',
    portal: false,
    defaultOpen: false,
    search: false,
    onOpenChange: () => {},
  },
  render: function Render({ placement, portal, defaultOpen, search, onOpenChange }) {
    const [query, setQuery] = useState<string>('');

    const items = [
      { text: 'My orders', icon: UserCircleIcon, badge: <Badge color='secondary'>2</Badge> },
      { text: 'Profile setting', icon: Cog6ToothIcon },
      { text: 'Sign out', icon: ArrowRightStartOnRectangleIcon, borderTop: true },
    ].filter((item) => item.text.toLowerCase().includes(query.trim().toLowerCase()));

    return (
      <Component placement={placement} portal={portal} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <Component.Trigger>
          <Button rightIcon={ChevronUpDownIcon}>Popover Button</Button>
        </Component.Trigger>
        <Component.Content search={search ? { value: query, onChange: setQuery, placeholder: 'Search' } : undefined}>
          {items.length ? (
            items.map((item) => (
              <Component.Item key={item.text} leftIcon={item.icon} badge={item.badge} borderTop={item.borderTop}>
                {item.text}
              </Component.Item>
            ))
          ) : (
            <Text as='p' size={14} style={{ margin: 0, padding: '12px' }}>
              Nothing found
            </Text>
          )}
        </Component.Content>
      </Component>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Popover: Story = {};
