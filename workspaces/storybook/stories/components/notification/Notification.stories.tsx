import * as heroicons from '@heroicons/react/24/outline';
import { Button, Notification as Component, Container, PBCProvider, useNotifications } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Notification/Notification',
  component: Component,
  decorators: [
    (Story) => (
      <PBCProvider notifications={{ top: 20 }}>
        <Container size='s'>
          <div style={{ paddingTop: '40px' }}>
            <Story />
          </div>
        </Container>
      </PBCProvider>
    ),
  ],
  argTypes: {
    id: {
      control: 'text',
      defaultValue: { summary: undefined },
      type: 'string',
    },
    headline: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    children: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    icon: {
      options: [undefined, ...Object.keys(heroicons)],
      control: 'select',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'SvgType' } },
    },
    iconClassName: {
      control: 'text',
      defaultValue: { summary: undefined },
      type: 'string',
    },
    className: {
      control: 'text',
      defaultValue: { summary: undefined },
      type: 'string',
    },
    delay: {
      control: 'number',
      defaultValue: { summary: 5000 },
      type: 'number',
    },
    animationDuration: {
      control: 'number',
      defaultValue: { summary: 200 },
      type: 'number',
    },
    disableCloseByClickInsideAnywhere: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    disableTimer: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    disableTimerPauseOnHover: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    disableProgressBar: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    closeButtonAriaLabel: {
      control: 'text',
      defaultValue: { summary: 'Close notification' },
      type: 'string',
    },
    onOpenChange: {
      control: false,
      table: { type: { summary: '(value: boolean, id?: string) => void' } },
    },
    onClose: {
      control: false,
      table: { type: { summary: '(value: boolean, id?: string) => void' } },
    },
    onClick: {
      control: false,
      table: { type: { summary: '() => void' } },
    },
    open: {
      table: { disable: true },
    },
    defaultOpen: {
      table: { disable: true },
    },
    isMouseInside: {
      table: { disable: true },
    },
    top: {
      table: { disable: true },
    },
    ref: {
      table: { disable: true },
    },
  },
  args: {
    id: undefined,
    headline: 'Notification from Notification story',
    children: 'This story demonstrates notification behavior.',
    icon: undefined,
    iconClassName: '',
    className: '',
    delay: 5000,
    animationDuration: 200,
    disableCloseByClickInsideAnywhere: false,
    disableTimer: false,
    disableTimerPauseOnHover: false,
    disableProgressBar: false,
    closeButtonAriaLabel: 'Close notification',
    onOpenChange: () => {},
    onClose: () => {},
    onClick: () => {},
  },
  render: function DemoRender({
    id,
    headline,
    children,
    icon,
    iconClassName,
    className,
    delay,
    animationDuration,
    disableCloseByClickInsideAnywhere,
    disableTimer,
    disableTimerPauseOnHover,
    disableProgressBar,
    closeButtonAriaLabel,
    onOpenChange,
    onClose,
    onClick,
  }) {
    const { showNotification } = useNotifications();

    return (
      <Button
        onClick={() =>
          showNotification({
            id: id ? id : undefined,
            // @ts-expect-error: Unreachable code error
            icon: icon ? heroicons[icon] : undefined,
            iconClassName: iconClassName ? iconClassName : undefined,
            headline: headline ? headline : 'Notification from Notification story',
            children: children ? children : undefined,
            delay,
            animationDuration,
            disableCloseByClickInsideAnywhere,
            disableTimer,
            disableTimerPauseOnHover,
            disableProgressBar,
            closeButtonAriaLabel: closeButtonAriaLabel ? closeButtonAriaLabel : undefined,
            className: className ? className : undefined,
            onOpenChange,
            onClose,
            onClick,
          })
        }
      >
        Show Notification
      </Button>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Notification: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `const { showNotification } = useNotifications();

<Button
  onClick={() =>
    showNotification({
      id: 'download-notification',
      headline: 'Notification from Notification story',
      children: 'This story demonstrates notification behavior.',
      delay: 5000,
      animationDuration: 200,
      disableCloseByClickInsideAnywhere: false,
      disableTimer: false,
      disableTimerPauseOnHover: false,
      disableProgressBar: false,
      closeButtonAriaLabel: 'Close notification',
    })
  }
>
  Show Notification
</Button>`,
      },
    },
  },
};
