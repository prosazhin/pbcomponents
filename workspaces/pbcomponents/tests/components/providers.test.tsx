import Button from '@/components/shared/button';
import Dialog from '@/components/shared/dialog';
import DialogProvider, { useDialog, useShowDialog } from '@/components/shared/dialog-provider';
import NotificationsProvider, { useNotifications } from '@/components/shared/notifications-provider';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('хуки провайдеров вне провайдера', () => {
  it('useNotifications бросает понятную ошибку', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useNotifications())).toThrow('useNotifications must be used within NotificationsProvider');
  });

  it('useDialog бросает понятную ошибку', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useDialog())).toThrow('useDialog must be used within DialogProvider');
  });
});

describe('NotificationsProvider', () => {
  const Demo = () => {
    const { notifications, showNotification, hideNotification } = useNotifications();

    return (
      <>
        <Button onClick={() => showNotification({ id: 'saved', headline: 'Saved' })}>Show</Button>
        <Button onClick={() => hideNotification('saved')}>Hide</Button>
        <span data-testid='count'>{notifications.length}</span>
      </>
    );
  };

  it('showNotification показывает уведомление, hideNotification убирает его', async () => {
    render(
      <NotificationsProvider disableTimer animationDuration={0}>
        <Demo />
      </NotificationsProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Show' }));

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    await userEvent.click(screen.getByRole('button', { name: 'Hide' }));

    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('0'));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('повторный показ с тем же id не дублирует уведомление', async () => {
    render(
      <NotificationsProvider disableTimer>
        <Demo />
      </NotificationsProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Show' }));
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getAllByText('Saved')).toHaveLength(1);
  });
});

describe('DialogProvider', () => {
  const Demo = () => {
    const { activeDialog, closeDialog } = useDialog();
    const showDialog = useShowDialog(() => <Dialog id='confirm'>Are you sure?</Dialog>);

    return (
      <>
        <Button onClick={showDialog}>Open</Button>
        <Button onClick={() => closeDialog()}>Close</Button>
        <span data-testid='active'>{activeDialog?.id ?? 'none'}</span>
      </>
    );
  };

  it('useShowDialog открывает диалог, closeDialog закрывает активный', async () => {
    const { container } = render(
      <DialogProvider animationDuration={0}>
        <Demo />
      </DialogProvider>,
    );
    const dialog = container.ownerDocument.getElementById('confirm')!;

    expect(dialog).toHaveTextContent('Are you sure?');
    expect(dialog).not.toHaveAttribute('open');

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByTestId('active')).toHaveTextContent('confirm');
    await waitFor(() => expect(dialog).toHaveAttribute('open'));

    await userEvent.click(screen.getByRole('button', { name: 'Close', hidden: true }));

    await waitFor(() => expect(dialog).not.toHaveAttribute('open'));
    await waitFor(() => expect(screen.getByTestId('active')).toHaveTextContent('none'));
  });
});
