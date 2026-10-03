import Dialog from '@/components/shared/dialog';
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Dialog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('при закрытии убирается из top layer только после анимации закрытия', () => {
    const onClose = vi.fn();
    const { container, rerender } = render(
      <Dialog id='dialog' open onClose={onClose} animationDuration={400}>
        Content
      </Dialog>,
    );
    const dialog = container.ownerDocument.getElementById('dialog')!;
    expect(dialog).toHaveAttribute('open');

    rerender(
      <Dialog id='dialog' open={false} onClose={onClose} animationDuration={400}>
        Content
      </Dialog>,
    );

    // закрытие идёт 80% от animationDuration (320ms) плюс 50ms запаса на последние кадры
    act(() => {
      vi.advanceTimersByTime(360);
    });
    expect(dialog).toHaveAttribute('open');
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(dialog).not.toHaveAttribute('open');
    expect(onClose).toHaveBeenCalledWith(false, 'dialog');
  });
});
