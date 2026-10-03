import useControllableState from '@/hooks/use-controllable-state';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useControllableState', () => {
  it('без value хранит состояние сам и стартует с defaultValue', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 1, onChange }));

    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));

    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('с value не меняет состояние само, а только зовёт onChange', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(({ value }) => useControllableState({ value, onChange }), {
      initialProps: { value: 'a' },
    });

    act(() => result.current[1]('b'));

    expect(result.current[0]).toBe('a');
    expect(onChange).toHaveBeenCalledWith('b');

    rerender({ value: 'b' });

    expect(result.current[0]).toBe('b');
  });

  it('не зовёт onChange, если значение не изменилось', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 'x', onChange }));

    act(() => result.current[1]('x'));

    expect(onChange).not.toHaveBeenCalled();
  });
});
