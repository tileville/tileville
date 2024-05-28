import { useEffect, useState } from "react";
import { clsx } from "clsx";

export const DateItem = ({
  date,
  activeDateTime,
  pickedDateTime,
  possibleDateTime,
  activeDate,
  pickedDate,
  setDateTo,
  setDateFrom,
  setActiveDate,
  setPickedDate,
  setPossibleDate,
}: {
  date: Date;
  activeDateTime: number | undefined;
  pickedDateTime: number | undefined;
  possibleDateTime: number | undefined;
  activeDate: Date | undefined;
  pickedDate: Date | undefined;
  setDateTo: (date: string) => void;
  setDateFrom: (date: string) => void;
  setActiveDate: (date: Date | undefined) => void;
  setPickedDate: (date: Date | undefined) => void;
  setPossibleDate: (date: Date | undefined) => void;
}) => {
  const [dateTime, setDateTime] = useState<number>(date.getTime());
  const [dateDay, setDateDay] = useState<number>(date.getDay());

  useEffect(() => {
    setDateTime(date.getTime());
    setDateDay(date.getDay());
  }, [date]);

  return (
    <button
      className={clsx(
        "border-bg-dark font-plexsans text-main cursor-pointer rounded-[5px] border p-4 text-center font-medium hover:opacity-80",
        {
          "border-left-accent text-left-accent":
            dateTime === activeDateTime || dateTime === pickedDateTime,
          "opacity:80 border-left-accent text-left-accent":
            dateTime === possibleDateTime,
          "border-left-accent bg-left-accent text-dark-buttons-text rounded-none":
            (activeDateTime &&
              dateTime < activeDateTime &&
              possibleDateTime &&
              dateTime > possibleDateTime) ||
            (activeDateTime &&
              dateTime > activeDateTime &&
              possibleDateTime &&
              dateTime < possibleDateTime) ||
            (activeDateTime &&
              dateTime < activeDateTime &&
              pickedDateTime &&
              dateTime > pickedDateTime) ||
            (activeDateTime &&
              dateTime > activeDateTime &&
              pickedDateTime &&
              dateTime < pickedDateTime),
          "rounded-r-none":
            (activeDateTime &&
              dateTime === activeDateTime &&
              possibleDateTime &&
              activeDateTime &&
              activeDateTime < possibleDateTime) ||
            (activeDateTime &&
              dateTime === activeDateTime &&
              pickedDateTime &&
              activeDateTime < pickedDateTime) ||
            (pickedDateTime &&
              dateTime === pickedDateTime &&
              activeDateTime &&
              pickedDateTime < activeDateTime) ||
            (possibleDateTime &&
              dateTime === possibleDateTime &&
              activeDateTime &&
              possibleDateTime < activeDateTime),
          "rounded-l-none":
            (activeDateTime &&
              dateTime === activeDateTime &&
              activeDateTime &&
              possibleDateTime &&
              activeDateTime > possibleDateTime) ||
            (activeDateTime &&
              dateTime === activeDateTime &&
              activeDateTime &&
              pickedDateTime &&
              activeDateTime > pickedDateTime) ||
            (pickedDateTime &&
              dateTime === pickedDateTime &&
              activeDateTime &&
              pickedDateTime > activeDateTime) ||
            (possibleDateTime &&
              dateTime === possibleDateTime &&
              activeDateTime &&
              possibleDateTime > activeDateTime),
          "col-start-1 col-end-1": dateDay == 0,
          "col-start-2 col-end-2": dateDay == 1,
          "col-start-3 col-end-3": dateDay == 2,
          "col-start-4 col-end-4": dateDay == 3,
          "col-start-5 col-end-5": dateDay == 4,
          "col-start-6 col-end-6": dateDay == 5,
          "col-start-7 col-end-7": dateDay == 6,
        }
      )}
      onMouseOver={() => {
        if (!pickedDate) if (activeDate) setPossibleDate(date);
      }}
      onClick={() => {
        if (!pickedDate) {
          if (!activeDate) {
            setActiveDate(date);
          }
          if (activeDate) {
            if (date === activeDate) setActiveDate(undefined);
            else {
              setPickedDate(date);
              const formatDate = (item: string | undefined) => {
                if (item && item.length < 2) return "0" + item;
                else return item;
              };
              const formatMonth = (item: number) => {
                item += 1;
                
                if (item.toString().length < 2) return "0" + item;
                else return item;
              };
              if (activeDate < date) {
                setDateFrom(
                  `${activeDate?.getFullYear().toString()}-${formatMonth(
                    activeDate?.getMonth()
                  )}-${formatDate(activeDate?.getDate().toString())}`
                );
                setDateTo(
                  `${date?.getFullYear().toString()}-${formatMonth(
                    date?.getMonth()
                  )}-${formatDate(date?.getDate().toString())}`
                );
              }
              if (activeDate > date) {
                setDateFrom(
                  `${date?.getFullYear().toString()}-${formatMonth(
                    date?.getMonth()
                  )}-${formatDate(date?.getDate().toString())}`
                );
                setDateTo(
                  `${activeDate?.getFullYear().toString()}-${formatMonth(
                    activeDate?.getMonth()
                  )}-${formatDate(activeDate?.getDate().toString())}`
                );
              }
            }
          }
        } else {
          setPickedDate(undefined);
          setActiveDate(date);
        }
      }}
    >
      {date.getDate()}
    </button>
  );
};
