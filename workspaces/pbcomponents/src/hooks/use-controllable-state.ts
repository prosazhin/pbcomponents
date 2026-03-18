import { useCallback, useRef, useState } from 'react';

type UseControllableStateParams<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (val: T) => void;
};

type UseControllableStateHook = {
  <T>(params: { value: T; defaultValue?: T; onChange?: (val: T) => void }): [T, (val: T) => void];
  <T>(params: { value?: T; defaultValue: T; onChange?: (val: T) => void }): [T, (val: T) => void];
  <T>(params: UseControllableStateParams<T>): [T | undefined, (val: T) => void];
};

const useControllableState = (<T>({ value, defaultValue, onChange }: UseControllableStateParams<T>) => {
  const [internal, setInternal] = useState<T | undefined>(defaultValue);

  const state = value !== undefined ? value : internal;
  const stateRef = useRef(state);
  stateRef.current = state;

  const setState = useCallback(
    (val: T) => {
      if (Object.is(stateRef.current, val)) return;

      if (value === undefined) {
        setInternal(val);
      }
      onChange?.(val);
    },
    [value, onChange],
  );

  return [state, setState] as [T | undefined, (val: T) => void];
}) as UseControllableStateHook;

export default useControllableState;
