import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../Button";
import { DateItem } from "./DateItem";

export const DatePicker = ({
  trigger,
  setDateFrom,
  setDateTo,
}: {
  trigger: ReactNode;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentDate, _setCurrentDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [activeDate, setActiveDate] = useState<Date | undefined>(undefined);
  const [possibleDate, setPossibleDate] = useState<Date | undefined>(undefined);
  const [pickedDate, setPickedDate] = useState<Date | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  // const getLastDayOfMonth = (year: number, month: number) => {
  //   return new Date(year, month + 1, 0).getDate();
  // };

  const clearDates = () => {
    setDateTo("");
    setDateFrom("");
    setActiveDate(undefined);
    setPossibleDate(undefined);
    setPickedDate(undefined);
  };

  return (
    <div className={"relative flex flex-col"}>
      <div className={"cursor-pointer"} onClick={() => setIsOpen(true)}>
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className={
              "fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-sm"
            }
            onClick={() => setIsOpen(false)}
          >
            <div
              className={
                "border-left-accent bg-bg-dark flex flex-col gap-8 rounded-[5px] border p-12"
              }
              onClick={(e) => e.stopPropagation()}
            >
              <div className={"flex w-full flex-row justify-between"}>
                <div
                  className={
                    "flex w-full max-w-[30%] cursor-pointer  items-center justify-start hover:opacity-80"
                  }
                  onClick={() => {
                    clearDates();
                    setCurrentMonth(
                      currentDate.setMonth(currentDate.getMonth() - 1)
                    );
                  }}
                >
                  <svg
                    width="9"
                    height="18"
                    viewBox="0 0 6 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 11L1 6L5 1"
                      stroke="#D2FF00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className={
                    "w-full text-center text-[18px]/[18px] font-medium"
                  }
                >
                  {currentDate
                    .toLocaleDateString("en-US", {
                      dateStyle: "long",
                    })
                    .split(" ")
                    .map((item, index) => (index === 1 ? " " : item))}
                </div>
                <div
                  className={
                    "flex w-full max-w-[30%] cursor-pointer items-center justify-end hover:opacity-80"
                  }
                  onClick={() => {
                    clearDates();
                    setCurrentMonth(
                      currentDate.setMonth(currentDate.getMonth() + 1)
                    );
                  }}
                >
                  <svg
                    width="9"
                    height="18"
                    viewBox="0 0 6 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L5 6L1 1"
                      stroke="#D2FF00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={"grid h-full w-full grid-cols-7 grid-rows-5 gap-y-1"}
              >
                <span className="font-plexsans text-left-accent rounded-[5px] p-4 text-center text-[15px]/[15px] font-[900]">
                  S
                </span>
                <span className="font-plexsans text-left-accent rounded-[5px] p-4 text-center text-[15px]/[15px] font-[900]">
                  M
                </span>
                <span className="font-plexsans text-left-accent rounded-[5px] p-4 text-center text-[15px]/[15px] font-[900]">
                  T
                </span>
                <span className="font-plexsans text-left-accent rounded-[5px] p-4 text-center text-[15px]/[15px] font-[900]">
                  W
                </span>
                <span className="font-plexsans text-left-accent rounded-[5px] p-4 text-center text-[15px]/[15px] font-[900]">
                  T
                </span>
                <span className="font-plexsans text-left-accent rounded-[5px] p-4 text-center text-[15px]/[15px] font-[900]">
                  F
                </span>
                <span className="font-plexsans text-left-accent rounded-[5px] p-4 text-center text-[15px]/[15px] font-[900]">
                  S
                </span>
                {[
                  ...Array(
                    getDaysInMonth(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1
                    )
                  ),
                ].map((_, index) => (
                  <DateItem
                    key={index}
                    date={
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        index + 1
                      )
                    }
                    activeDateTime={activeDate?.getTime()}
                    pickedDateTime={pickedDate?.getTime()}
                    possibleDateTime={possibleDate?.getTime()}
                    activeDate={activeDate}
                    pickedDate={pickedDate}
                    setDateTo={setDateTo}
                    setDateFrom={setDateFrom}
                    setActiveDate={setActiveDate}
                    setPickedDate={setPickedDate}
                    setPossibleDate={setPossibleDate}
                  />
                ))}
              </div>
              <div className={"flex w-full flex-row justify-between"}>
                <Button
                  label={"Cancel"}
                  onClick={() => setIsOpen(false)}
                  isFilled={false}
                  isBordered={false}
                />
                <div className={"w-full"} />
                <Button label={"Done"} onClick={() => setIsOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
