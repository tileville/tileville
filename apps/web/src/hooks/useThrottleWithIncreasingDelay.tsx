import { useCallback, useEffect, useRef, useState } from "react";

interface ThrottleHookResult {
  throttledFunction: (callback: () => void) => void;
  isThrottled: boolean;
  currentDelay: number;
  resetThrottle: () => void;
}

export const useThrottleWithIncreasingDelay = (
  initialDelay = 1000,
  increment = 500
): ThrottleHookResult => {
  const [isThrottled, setIsThrottled] = useState<boolean>(false);
  const [currentDelay, setCurrentDelay] = useState<number>(initialDelay);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef<number>(0);

  const throttledFunction = useCallback(
    (callback: () => void) => {
      if (isThrottled) {
        return;
      }

      // Execute the callback
      callback();

      // Increment click count and increase delay
      clickCountRef.current += 1;
      const newDelay = initialDelay + increment * clickCountRef.current;
      setCurrentDelay(newDelay);

      // Set throttle state
      setIsThrottled(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setIsThrottled(false);
      }, newDelay);
    },
    [isThrottled, initialDelay, increment]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resetThrottle = useCallback(() => {
    clickCountRef.current = 0;
    setCurrentDelay(initialDelay);
    setIsThrottled(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [initialDelay]);

  return {
    throttledFunction,
    isThrottled,
    currentDelay,
    resetThrottle,
  };
};
