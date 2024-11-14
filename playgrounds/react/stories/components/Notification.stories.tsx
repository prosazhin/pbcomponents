import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/outline';
import { Button, Notification as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { notificationArg } from '../args';

import '../main.css';

const meta = {
  title: 'Components/Notification',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(notificationArg),
  },
  args: {
    headline: 'Headline',
    description: 'Description',
    open: false,
    delay: 3000,
    top: 0,
    onClose: () => {},
    icon: undefined,
    iconClassName: '',
    className: '',
  },
  render: function Render(args) {
    const { headline, description, delay, top, icon, iconClassName, className } = args;
    const [{ open }, setArgs] = useArgs();

    return (
      <div>
        <Button onClick={() => setArgs({ open: !open })}>Toggle Notification</Button>
        <Component
          open={open}
          delay={delay}
          top={top}
          headline={headline}
          description={description ? description : undefined}
          // @ts-expect-error: Unreachable code error
          icon={icon ? heroicons[icon] : icon}
          iconClassName={iconClassName ? iconClassName : undefined}
          className={className ? className : undefined}
          onClose={(value) => setArgs({ open: value })}
        />
      </div>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
