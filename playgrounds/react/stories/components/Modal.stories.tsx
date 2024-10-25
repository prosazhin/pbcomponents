import { Meta, StoryObj } from '@storybook/react';

import { Button, Modal as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { modalArg } from '../args';

const meta = {
  title: 'Components/Modal',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(modalArg),
  },
  args: {
    children: <div>Modal content</div>,
    open: false,
    onClose: () => {},
    className: '',
  },
  render: function Render(args) {
    const { children, className, onClose } = args;
    const [{ open }, setArgs] = useArgs();

    return (
      <div>
        <Button onClick={() => setArgs({ open: !open })}>Toggle modal</Button>
        <Component
          open={open}
          className={className ? className : undefined}
          onClose={(value) => {
            onClose(value);
            setArgs({ open: value });
          }}
        >
          {children}
        </Component>
      </div>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
