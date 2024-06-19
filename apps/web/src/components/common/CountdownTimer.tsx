import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

type CountdownTimerProps = {
  countdownTime: number;
  className?: string;
};
let intervalId: NodeJS.Timer;

export const CountdownTimer = ({
  countdownTime,
  className,
}: CountdownTimerProps) => {
  const [countDownTime, setCountDownTIme] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const getTimeDifference = (countDownTime: number) => {
    const currentTime = new Date().getTime();
    const timeDiffrence = countDownTime - currentTime;
    let days =
      Math.floor(timeDiffrence / (24 * 60 * 60 * 1000)) >= 10
        ? Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))
        : `0${Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))}`;
    const hours =
      Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) >=
      10
        ? Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
        : `0${Math.floor(
            (timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
          )}`;
    const minutes =
      Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60)) >= 10
        ? Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))
        : `0${Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))}`;
    const seconds =
      Math.floor((timeDiffrence % (60 * 1000)) / 1000) >= 10
        ? Math.floor((timeDiffrence % (60 * 1000)) / 1000)
        : `0${Math.floor((timeDiffrence % (60 * 1000)) / 1000)}`;
    if (timeDiffrence < 0) {
      setCountDownTIme({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      clearInterval(intervalId);
    } else {
      setCountDownTIme({
        days: days.toString(),
        hours: hours.toString(),
        minutes: minutes.toString(),
        seconds: seconds.toString(),
      });
    }
  };
  const startCountDown = useCallback(() => {
    intervalId = setInterval(() => {
      getTimeDifference(countdownTime);
    }, 1000);
  }, []);

  useEffect(() => {
    startCountDown();
  }, [startCountDown]);

  return (
    <div
      className={clsx(
        className,
        "flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-16"
      )}
    >
      <div className="flex justify-center gap-3 sm:gap-8">
        <div className="relative flex flex-col gap-5">
          <div className="flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40">
            <div className="relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
            <span className="text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl">
              {countDownTime?.days}
            </span>
            <div className="relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
          </div>
          <span className="text-center text-xs capitalize text-[#8486A9] sm:text-2xl">
            {+countDownTime?.days == 1 ? "Day" : "Days"}
          </span>
        </div>
        <div className="relative flex flex-col gap-5">
          <div className="flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40">
            <div className="relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
            <span className="text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl">
              {countDownTime?.hours}
            </span>
            <div className="relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
          </div>
          <span className="text-center text-xs font-medium text-[#8486A9] sm:text-2xl">
            {+countDownTime?.hours == 1 ? "Hour" : "Hours"}
          </span>
        </div>
        <div className="relative flex flex-col gap-5">
          <div className="flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40">
            <div className="relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
            <span className="text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl">
              {countDownTime?.minutes}
            </span>
            <div className="relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
          </div>
          <span className="text-center text-xs capitalize text-[#8486A9] sm:text-2xl">
            {+countDownTime?.minutes == 1 ? "Minute" : "Minutes"}
          </span>
        </div>
        <div className="relative flex flex-col gap-5">
          <div className="flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40">
            <div className="relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
            <span className="text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl">
              {countDownTime?.seconds}
            </span>
            <div className="relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3"></div>
          </div>
          <span className="text-center text-xs capitalize text-[#8486A9] sm:text-2xl">
            {+countDownTime?.seconds == 1 ? "Second" : "Seconds"}
          </span>
        </div>
      </div>
    </div>
  );
};
