import Button from '@/components/shared/button';
import Popover from '@/components/shared/popover';
import { StarIcon } from '@heroicons/react/24/outline';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const renderMenu = (props: Partial<Parameters<typeof Popover>[0]> = {}, onEdit = vi.fn()) =>
  render(
    <Popover {...props}>
      <Popover.Trigger>
        <Button>Actions</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Item onClick={onEdit}>Edit</Popover.Item>
        <Popover.Item disabled>Delete</Popover.Item>
      </Popover.Content>
    </Popover>,
  );

describe('Popover', () => {
  it('открывается по клику на триггер и закрывается по Escape', async () => {
    const onOpenChange = vi.fn();
    renderMenu({ onOpenChange });

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByText('Edit')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await waitFor(() => expect(screen.queryByText('Edit')).not.toBeInTheDocument());
  });

  it('клик по пункту зовёт его onClick и закрывает попап', async () => {
    const onEdit = vi.fn();
    const onOpenChange = vi.fn();
    renderMenu({ onOpenChange }, onEdit);

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await userEvent.click(screen.getByText('Edit'));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('клик по задизейбленному пункту не закрывает попап', async () => {
    const onOpenChange = vi.fn();
    renderMenu({ onOpenChange });

    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await userEvent.click(screen.getByText('Delete'));

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('defaultOpen показывает содержимое сразу', () => {
    renderMenu({ defaultOpen: true });

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('у Button-триггера по умолчанию стрелка справа', () => {
    renderMenu();

    expect(screen.getByRole('button', { name: 'Actions' }).querySelectorAll('svg')).toHaveLength(1);
  });

  it('свой rightIcon у кнопки не подменяется, icon={false} убирает стрелку', () => {
    const { unmount } = render(
      <Popover>
        <Popover.Trigger>
          <Button rightIcon={StarIcon}>Own</Button>
        </Popover.Trigger>
      </Popover>,
    );
    const ownIcon = screen.getByRole('button', { name: 'Own' }).querySelectorAll('svg');
    expect(ownIcon).toHaveLength(1);
    expect(ownIcon[0].innerHTML).toBe(render(<StarIcon />).container.querySelector('svg')!.innerHTML);
    unmount();

    render(
      <Popover>
        <Popover.Trigger icon={false}>
          <Button>Plain</Button>
        </Popover.Trigger>
      </Popover>,
    );
    expect(screen.getByRole('button', { name: 'Plain' }).querySelector('svg')).toBeNull();
  });
});
