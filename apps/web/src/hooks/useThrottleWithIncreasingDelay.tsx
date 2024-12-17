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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef<number>(0);

  const throttledFunction = useCallback(
    (callback: () => void) => {
      if (isThrottled) return;

      // Execute the callback
      callback();

      // Increment click count and increase delay
      clickCountRef.current += 1;
      const newDelay = initialDelay + increment * clickCountRef.current;
      setCurrentDelay(newDelay);

      // Set throttle state
      setIsThrottled(true);

      // Clear any existing timeout or interval
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Start countdown interval
      let remainingTime = Math.ceil(newDelay / 1000); // convert delay to seconds
      intervalRef.current = setInterval(() => {
        remainingTime -= 1;
        setCurrentDelay(remainingTime * 1000); // update currentDelay in milliseconds
        if (remainingTime <= 0) {
          clearInterval(intervalRef.current!);
        }
      }, 1000);

      // Set timeout to reset throttle
      timeoutRef.current = setTimeout(() => {
        setIsThrottled(false);
        setCurrentDelay(initialDelay);
        clearInterval(intervalRef.current!);
      }, newDelay);
    },
    [isThrottled, initialDelay, increment]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetThrottle = useCallback(() => {
    clickCountRef.current = 0;
    setCurrentDelay(initialDelay);
    setIsThrottled(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [initialDelay]);

  return {
    throttledFunction,
    isThrottled,
    currentDelay,
    resetThrottle,
  };
};
