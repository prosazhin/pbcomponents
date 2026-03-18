import { Button, Dialog as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Dialog/Dialog',
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
      table: { type: { summary: 'React.ReactNode' } },
      defaultValue: { summary: undefined },
    },
    id: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
    open: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    onOpenChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(value: boolean) => void' } },
    },
    onClose: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(value: boolean) => void' } },
    },
  },
  args: {
    children: <div>Dialog content</div>,
    id: 'test-dialog',
    open: false,
    backdrop: true,
    onOpenChange: () => {},
    onClose: () => {},
    className: '',
  },
  render: function Render(args) {
    const { children, className, id, backdrop, onOpenChange, onClose } = args;
    const [{ open }, setArgs] = useArgs();

    return (
      <div>
        <Button onClick={() => setArgs({ open: !open })}>Open Dialog</Button>
        <Component
          id={id}
          open={open}
          backdrop={backdrop}
          className={className ? className : undefined}
          onOpenChange={(value: boolean) => {
            if (onOpenChange) {
              onOpenChange(value);
            }

            setArgs({ open: value });
          }}
          onClose={(value: boolean) => {
            if (onClose) {
              onClose(value);
            }
          }}
        >
          {children}
          <Button color='primary' theme='filled' className='pbc:mt-24' onClick={() => setArgs({ open: false })}>
            Close Dialog
          </Button>
        </Component>
      </div>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dialog: Story = {};
