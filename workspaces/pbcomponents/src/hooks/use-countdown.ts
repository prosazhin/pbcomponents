import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCountdown({
  delay,
  paused,
  onComplete,
  enabled = true,
}: {
  delay: number;
  paused: boolean;
  onComplete?: () => void;
  enabled?: boolean;
}) {
  const [progress, setProgress] = useState<number>(0);
  const startRef = useRef<number>(0);
  const pauseStartRef = useRef<number | null>(null);
  const accumulatedPauseRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastRoundedRef = useRef<number>(0);
  const completedRef = useRef<boolean>(false);
  const delayRef = useRef<number>(delay);
  delayRef.current = delay;

  const pausedRef = useRef<boolean>(paused);
  pausedRef.current = paused;

  const onCompleteRef = useRef<(() => void) | undefined>(onComplete);
  onCompleteRef.current = onComplete;

  const stopTicking = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    stopTicking();

    if (!enabled) {
      pauseStartRef.current = null;
      accumulatedPauseRef.current = 0;
      lastRoundedRef.current = 0;
      completedRef.current = false;
      setProgress(0);

      return;
    }

    if (delay <= 0) {
      pauseStartRef.current = null;
      accumulatedPauseRef.current = 0;
      lastRoundedRef.current = 100;
      completedRef.current = true;
      setProgress(100);
      onCompleteRef.current?.();

      return;
    }

    startRef.current = performance.now();
    pauseStartRef.current = null;
    accumulatedPauseRef.current = 0;
    lastRoundedRef.current = 0;
    completedRef.current = false;
    setProgress(0);

    return stopTicking;
  }, [delay, enabled, stopTicking]);

  useEffect(() => {
    if (!enabled || completedRef.current || delayRef.current <= 0) return;

    if (paused) {
      if (pauseStartRef.current === null) {
        pauseStartRef.current = performance.now();
      }
      stopTicking();

      return;
    }

    const now = performance.now();
    if (pauseStartRef.current !== null) {
      accumulatedPauseRef.current += now - pauseStartRef.current;
      pauseStartRef.current = null;
    }

    const tick = () => {
      if (pausedRef.current || completedRef.current) return;

      const elapsed = performance.now() - startRef.current - accumulatedPauseRef.current;
      const pct = Math.min(Math.max((elapsed / delayRef.current) * 100, 0), 100);
      const rounded = Math.round(pct);

      if (rounded !== lastRoundedRef.current) {
        lastRoundedRef.current = rounded;
        setProgress(rounded);
      }

      if (rounded >= 100) {
        completedRef.current = true;
        stopTicking();
        onCompleteRef.current?.();

        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return stopTicking;
  }, [enabled, paused, stopTicking]);

  return progress;
}
