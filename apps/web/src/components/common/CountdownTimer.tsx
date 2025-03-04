import clsx from "clsx";
import { getTime } from "date-fns";
import React, { useEffect, useState } from "react";

type CountdownTimerProps = {
  initialTime: number;
  className?: string;
  onComplete?: () => void;
};

type TimeUnits = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const DEFAULT_TIME: TimeUnits = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

export const useCountdownTimer = (
  initialTime: number,
  onComplete?: () => void
) => {
  const [countDownTime, setCountDownTime] = useState<TimeUnits>(DEFAULT_TIME);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(initialTime)) {
      console.warn("Invalid initialTime provided to countdown timer");
      return;
    }

    const calculateTimeDifference = () => {
      const currentTime = getTime(new Date());
      const timeDifference = initialTime - currentTime;

      if (timeDifference <= 0) {
        setCountDownTime(DEFAULT_TIME);

        if (!isComplete) {
          setIsComplete(true);
          onComplete?.();
        }

        return false;
      }

      // Calculate time units
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      // Format time units
      setCountDownTime({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });

      return true;
    };

    // Calculate initially
    const shouldContinue = calculateTimeDifference();
    if (!shouldContinue) return;

    // Set up interval
    const intervalId = setInterval(calculateTimeDifference, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [initialTime, isComplete, onComplete]);

  return { countDownTime, isComplete };
};

export const CountdownTimer = ({
  initialTime,
  className,
  onComplete,
}: CountdownTimerProps) => {
  const { countDownTime } = useCountdownTimer(initialTime, onComplete);

  const timeUnits = [
    {
      value: countDownTime.days,
      label: +countDownTime.days === 1 ? "Day" : "Days",
    },
    {
      value: countDownTime.hours,
      label: +countDownTime.hours === 1 ? "Hour" : "Hours",
    },
    {
      value: countDownTime.minutes,
      label: +countDownTime.minutes === 1 ? "Minute" : "Minutes",
    },
    {
      value: countDownTime.seconds,
      label: +countDownTime.seconds === 1 ? "Second" : "Seconds",
    },
  ];

  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-16",
        className
      )}
      role="timer"
      aria-live="polite"
    >
      <div className="flex justify-center gap-3">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="relative flex flex-col items-center gap-1">
              <div className="flex items-center justify-between rounded-lg bg-primary/30 px-2 py-1 text-center">
                <span className="text-center font-semibold text-primary">
                  {unit.value}
                </span>
              </div>
              <span className="text-center text-xs capitalize text-black/60">
                {unit.label}
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="self-center font-semibold">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
