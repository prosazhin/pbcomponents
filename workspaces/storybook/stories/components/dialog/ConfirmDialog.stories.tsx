import { ConfirmDialog as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Dialog/ConfirmDialog',
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
    id: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    title: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    description: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    color: {
      options: ['primary', 'danger'],
      control: 'radio',
      defaultValue: { summary: 'primary' },
    },
    confirmText: { control: 'text', type: 'string', defaultValue: { summary: 'Confirm' } },
    cancelText: { control: 'text', type: 'string', defaultValue: { summary: 'Cancel' } },
    trigger: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'ButtonProps' } },
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
  },
  args: {
    id: 'confirm-dialog',
    title: 'Delete project?',
    description: 'This action cannot be undone. This will permanently delete the project and all of its data.',
    color: 'danger',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    trigger: { children: 'Open dialog' },
    onConfirm: () => {},
    onCancel: () => {},
  },
  render: ({ id, title, description, color, confirmText, cancelText, trigger, onConfirm, onCancel }) => (
    <Component
      id={id}
      title={title}
      description={description ? description : undefined}
      color={color}
      confirmText={confirmText}
      cancelText={cancelText}
      trigger={{ ...trigger, color }}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ConfirmDialog: Story = {};
