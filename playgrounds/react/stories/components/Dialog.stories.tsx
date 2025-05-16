import { Meta, StoryObj } from '@storybook/react';

import { Button, Dialog as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { dialogArg } from '../args';

import '../dialog.css';
import '../main.css';

const meta = {
  title: 'Components/Dialog',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(dialogArg),
  },
  args: {
    children: <div>Dialog content</div>,
    id: 'test-dialog',
    open: false,
    backdrop: true,
    onClose: () => {},
    className: '',
  },
  render: function Render(args) {
    const { children, className, id, backdrop, onClose } = args;
    const [{ open }, setArgs] = useArgs();

    return (
      <div>
        <Button onClick={() => setArgs({ open: !open })}>Toggle Dialog</Button>
        <Component
          id={id}
          open={open}
          backdrop={backdrop}
          className={className ? className : undefined}
          onClose={(value: boolean) => {
            if (onClose) {
              onClose(value);
            }

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
