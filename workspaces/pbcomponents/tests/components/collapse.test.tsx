import Collapse from '@/components/shared/collapse';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Collapse', () => {
  it('по умолчанию закрыт; клик по заголовку открывает и закрывает', async () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <Collapse summary='Question' onOpenChange={onOpenChange}>
        Answer
      </Collapse>,
    );
    const details = container.querySelector('details')!;

    expect(details).not.toHaveAttribute('open');
    expect(screen.queryByText('Answer')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Question'));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(details).toHaveAttribute('open');
    expect(screen.getByText('Answer')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Question'));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    // details остаётся открытым, пока доигрывает анимация закрытия
    await waitFor(() => expect(screen.queryByText('Answer')).not.toBeInTheDocument());
    await waitFor(() => expect(details).not.toHaveAttribute('open'));
  });

  it('defaultOpen открывает сразу', () => {
    render(
      <Collapse summary='Question' defaultOpen>
        Answer
      </Collapse>,
    );

    expect(screen.getByText('Answer')).toBeInTheDocument();
  });

  it('open управляет состоянием снаружи', () => {
    const { rerender } = render(
      <Collapse summary='Question' open={false}>
        Answer
      </Collapse>,
    );
    expect(screen.queryByText('Answer')).not.toBeInTheDocument();

    rerender(
      <Collapse summary='Question' open>
        Answer
      </Collapse>,
    );
    expect(screen.getByText('Answer')).toBeInTheDocument();
  });
});
