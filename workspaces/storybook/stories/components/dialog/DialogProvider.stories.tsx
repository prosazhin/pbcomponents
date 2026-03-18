import { Button, DialogProvider as Component, Container, Dialog, useDialog, useShowDialog } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const DIALOG_ID = 'providers-dialog';

const DialogProviderDemo = () => {
  const { closeDialog } = useDialog();
  const showDialog = useShowDialog(() => (
    <Dialog id={DIALOG_ID}>
      <div>Dialog content</div>
      <Button color='primary' theme='filled' className='pbc:mt-24' onClick={() => closeDialog(DIALOG_ID)}>
        Close Dialog
      </Button>
    </Dialog>
  ));

  return <Button onClick={showDialog}>Open Dialog</Button>;
};

const meta = {
  title: 'Components/Dialog/DialogProvider',
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
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DialogProvider: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Component>
      <DialogProviderDemo />
    </Component>
  ),
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `const Demo = () => {
  const { closeDialog } = useDialog();
  const showDialog = useShowDialog(() => (
    <Dialog id='dialog'>
      <div>Dialog content</div>
      <Button color='primary' theme='filled' className='pbc:mt-24' onClick={() => closeDialog('dialog')}>
        Close
      </Button>
    </Dialog>
  ));

  return <Button onClick={showDialog}>Open Dialog</Button>;
};

<DialogProvider>
  <Demo />
</DialogProvider>`,
      },
    },
  },
};
