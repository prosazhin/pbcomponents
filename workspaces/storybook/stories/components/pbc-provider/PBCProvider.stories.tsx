import { Button, PBCProvider as Component, Container, Dialog, useDialog, useNotifications, useShowDialog } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const DIALOG_ID = 'providers-dialog';

const PBCProviderDemo = () => {
  const { showNotification } = useNotifications();
  const { closeDialog } = useDialog();
  const showDialog = useShowDialog(() => (
    <Dialog id={DIALOG_ID}>
      <div>Dialog from PBCProvider</div>
      <Button color='primary' theme='filled' className='pbc:mt-24' onClick={() => closeDialog(DIALOG_ID)}>
        Close Dialog
      </Button>
    </Dialog>
  ));

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          showNotification({
            headline: 'Notification from PBCProvider',
            children: 'Both providers are available.',
          })
        }
      >
        Show Notification
      </Button>
      <Button onClick={showDialog}>Open Dialog</Button>
    </div>
  );
};

const meta = {
  title: 'Components/PBCProvider',
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
    notifications: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: "Omit<NotificationsProviderProps, 'children'>" } },
    },
    dialog: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: "Omit<DialogProviderProps, 'children'>" } },
    },
  },
  args: {
    children: null,
    notifications: {
      top: 20,
      delay: 5000,
      animationDuration: 200,
      estimatedNotificationHeight: 80,
      disableCloseByClickInsideAnywhere: false,
      disableTimer: false,
      disableTimerPauseOnContainerHover: false,
      disableTimerPauseOnHover: false,
      disableProgressBar: false,
    },
    dialog: {
      animationDuration: 200,
    },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PBCProvider: Story = {
  render: function Render({ notifications, dialog }) {
    return (
      <Component notifications={notifications} dialog={dialog}>
        <PBCProviderDemo />
      </Component>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `const Demo = () => {
  const { showNotification } = useNotifications();
  const { closeDialog } = useDialog();
  const showDialog = useShowDialog(() => (
    <Dialog id='dialog'>
      <div>Dialog content</div>
      <Button color='primary' theme='filled' className='pbc:mt-24' onClick={() => closeDialog('dialog')}>
        Close Dialog
      </Button>
    </Dialog>
  ));

  return (
    <>
      <Button onClick={() => showNotification({ headline: 'Title', children: 'Description' })}>Show Notification</Button>
      <Button onClick={showDialog}>Open Dialog</Button>
    </>
  );
};

<PBCProvider
  notifications={{ top: 20, delay: 5000 }}
  dialog={{ animationDuration: 200 }}
>
  <Demo />
</PBCProvider>`,
      },
    },
  },
};
