import { Button, ConfirmPopover as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Popover/ConfirmPopover',
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
    title: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    description: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    color: {
      options: ['primary', 'danger'],
      control: 'radio',
      defaultValue: { summary: 'primary' },
    },
    confirmText: { control: 'text', type: 'string', defaultValue: { summary: 'Confirm' } },
    cancelText: { control: 'text', type: 'string', defaultValue: { summary: 'Cancel' } },
    placement: {
      options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'],
      control: 'select',
      defaultValue: { summary: 'bottom-start' },
    },
    onConfirm: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '() => void' } },
    },
    onCancel: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '() => void' } },
    },
    children: {
      control: 'object',
      table: { type: { summary: 'ReactElement' } },
      defaultValue: { summary: undefined },
    },
  },
  args: {
    children: <Button>Open</Button>,
    title: 'Confirm action',
    description: 'Are you sure you want to proceed? This action can be undone later.',
    color: 'primary',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    placement: 'bottom-start',
    onConfirm: () => {},
    onCancel: () => {},
  },
  render: ({ children, title, description, color, confirmText, cancelText, placement, onConfirm, onCancel }) => (
    <Component
      title={title}
      description={description ? description : undefined}
      color={color}
      confirmText={confirmText}
      cancelText={cancelText}
      placement={placement}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ConfirmPopover: Story = {};
