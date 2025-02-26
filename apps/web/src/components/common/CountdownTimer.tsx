import clsx from "clsx";
import { getTime } from "date-fns";
import { useEffect, useState } from "react";

type CountdownTimerProps = {
  initialTime: number;
  className?: string;
};

const formatTimeUnit = (unit: number) => unit.toString().padStart(2, "0");

export const useCountdownTimer = (initialTime: number) => {
  const [countDownTime, setCountDownTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!Number.isInteger(initialTime)) return;

    const updateCountdown = () => {
      const currentTime = getTime(new Date());
      const timeDifference = Math.max(0, initialTime - currentTime);

      const days = formatTimeUnit(
        Math.floor(timeDifference / (24 * 60 * 60 * 1000))
      );
      const hours = formatTimeUnit(
        Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
      );
      const minutes = formatTimeUnit(
        Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60))
      );
      const seconds = formatTimeUnit(
        Math.floor((timeDifference % (60 * 1000)) / 1000)
      );

      setCountDownTime({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [initialTime]);

  return { countDownTime };
};

const TimeUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="relative flex flex-col items-center gap-1">
    <div className="flex items-center justify-center rounded-lg bg-primary/30 px-2 py-1 text-center">
      <span className="text-center font-semibold text-primary">{value}</span>
    </div>
    <span className="text-center text-xs capitalize text-black/60">
      {+value === 1 ? label.slice(0, -1) : label}
    </span>
  </div>
);

export const CountdownTimer = ({
  initialTime,
  className,
}: CountdownTimerProps) => {
  const { countDownTime } = useCountdownTimer(initialTime);

  return (
    <div
      className={clsx(
        className,
        "flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-16"
      )}
    >
      <div className="flex justify-center gap-3">
        <TimeUnit value={countDownTime.days} label="Days" />
        :
        <TimeUnit value={countDownTime.hours} label="Hours" />
        :
        <TimeUnit value={countDownTime.minutes} label="Minutes" />
        :
        <TimeUnit value={countDownTime.seconds} label="Seconds" />
      </div>
    </div>
  );
};
