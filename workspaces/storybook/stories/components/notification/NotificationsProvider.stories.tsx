import { Button, NotificationsProvider as Component, Container, useNotifications } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const NotificationsProviderDemo = () => {
  const { notifications, showNotification, hideNotification } = useNotifications();
  const latestNotification = notifications[0];

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          showNotification({
            headline: 'Notification from NotificationsProvider',
            children: 'This provider is configured and ready.',
          })
        }
      >
        Show Notification
      </Button>
      <Button
        color='danger'
        theme='border'
        onClick={() => latestNotification && hideNotification(latestNotification.id)}
        disabled={!latestNotification}
      >
        Hide Notification
      </Button>
    </div>
  );
};

const meta = {
  title: 'Components/Notification/NotificationsProvider',
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
    children: {
      table: { disable: true },
    },
    className: {
      control: 'text',
      defaultValue: { summary: undefined },
      type: 'string',
    },
    top: {
      control: 'number',
      defaultValue: { summary: 0 },
      type: 'number',
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
    estimatedNotificationHeight: {
      control: 'number',
      defaultValue: { summary: 80 },
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
    disableTimerPauseOnContainerHover: {
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
  },
  args: {
    className: '',
    top: 20,
    delay: 5000,
    animationDuration: 200,
    estimatedNotificationHeight: 80,
    disableCloseByClickInsideAnywhere: false,
    disableTimer: false,
    disableTimerPauseOnContainerHover: false,
    disableTimerPauseOnHover: false,
    disableProgressBar: false,
    children: null,
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotificationsProvider: Story = {
  render: function Render({ className, ...providerProps }) {
    return (
      <Component {...providerProps} className={className ? className : undefined}>
        <NotificationsProviderDemo />
      </Component>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `const Demo = () => {
  const { notifications, showNotification, hideNotification } = useNotifications();
  const latestNotification = notifications[0];

  return (
    <>
      <Button onClick={() => showNotification({ headline: 'Notification from NotificationsProvider', children: 'This provider is configured and ready.' })}>
        Show Notification
      </Button>
      <Button onClick={() => latestNotification && hideNotification(latestNotification.id)} disabled={!latestNotification}>
        Hide Notification
      </Button>
    </>
  );
};

<NotificationsProvider top={0} delay={5000} animationDuration={200} estimatedNotificationHeight={80}>
  <Demo />
</NotificationsProvider>`,
      },
    },
  },
};
