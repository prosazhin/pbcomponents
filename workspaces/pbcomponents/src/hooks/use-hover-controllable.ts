import useControllableState from '@/hooks/use-controllable-state';
import { RefObject, useCallback, useEffect, useRef } from 'react';

type HoverTargetRef<T extends HTMLElement> = RefObject<T | null>;

export default function useHoverControllable<T extends HTMLElement>({
  ref,
  value,
  defaultValue = false,
  onChange,
  enabled = true,
}: {
  ref?: HoverTargetRef<T>;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  enabled?: boolean;
}) {
  const [isHovering, setIsHovering] = useControllableState<boolean>({
    value,
    defaultValue,
    onChange,
  });
  const setIsHoveringRef = useRef(setIsHovering);
  setIsHoveringRef.current = setIsHovering;
  const trackedNodeRef = useRef<T | null>(null);
  const isListeningRef = useRef(false);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const handleEnter = useCallback(() => {
    setIsHoveringRef.current(true);
  }, []);

  const handleLeave = useCallback(() => {
    setIsHoveringRef.current(false);
  }, []);

  const stopListening = useCallback(
    (node: T) => {
      if (!isListeningRef.current) return;

      node.removeEventListener('mouseenter', handleEnter);
      node.removeEventListener('mouseleave', handleLeave);
      isListeningRef.current = false;
    },
    [handleEnter, handleLeave],
  );

  const startListening = useCallback(
    (node: T) => {
      if (isListeningRef.current || !enabledRef.current) return;

      node.addEventListener('mouseenter', handleEnter);
      node.addEventListener('mouseleave', handleLeave);
      isListeningRef.current = true;
    },
    [handleEnter, handleLeave],
  );

  const setTrackedNode = useCallback(
    (nextNode: T | null) => {
      const trackedNode = trackedNodeRef.current;
      if (trackedNode === nextNode) return;

      if (trackedNode) {
        stopListening(trackedNode);
      }

      trackedNodeRef.current = nextNode;
      if (nextNode) {
        startListening(nextNode);
      }
    },
    [startListening, stopListening],
  );

  const setHoverTargetRef = useCallback(
    (node: T | null) => {
      setTrackedNode(node);
    },
    [setTrackedNode],
  );
  const objectRefNode = ref?.current;

  useEffect(() => {
    if (!ref) return;

    setTrackedNode(objectRefNode ?? null);
  }, [objectRefNode, ref, setTrackedNode]);

  useEffect(() => {
    const trackedNode = trackedNodeRef.current;
    if (!trackedNode) return;

    if (enabled) {
      startListening(trackedNode);

      return;
    }

    stopListening(trackedNode);
  }, [enabled, startListening, stopListening]);

  useEffect(() => {
    if (!enabled) {
      setIsHovering(false);
    }
  }, [enabled, setIsHovering]);

  useEffect(() => {
    return () => {
      const trackedNode = trackedNodeRef.current;
      if (!trackedNode) return;

      stopListening(trackedNode);
      trackedNodeRef.current = null;
    };
  }, [stopListening]);

  return [isHovering, setIsHovering, setHoverTargetRef] as const;
}
