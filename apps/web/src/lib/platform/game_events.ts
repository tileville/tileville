import { DateTime, DurationObjectUnits, Interval } from "luxon";
import { useEffect, useState } from "react";

export enum ZkNoidEventType {
  PAST_EVENTS = "Past events",
  CURRENT_EVENTS = "Current events",
  UPCOMING_EVENTS = "Upcoming events",
  PREREGISTRAION = "Preregistration of the event",
}

export const ALL_GAME_EVENT_TYPES = [
  ZkNoidEventType.PAST_EVENTS,
  ZkNoidEventType.CURRENT_EVENTS,
  ZkNoidEventType.UPCOMING_EVENTS,
  ZkNoidEventType.PREREGISTRAION,
];

export type ZkNoidEvent = {
  name: string;
  description: string;
  eventStarts: number;
  eventEnds: number;
  link: string;
};

export const GAME_EVENTS: ZkNoidEvent[] = [
  {
    name: "Randzu meetup",
    description: "This time players can meet up and play together",
    eventStarts: new Date("2024-06-30").getTime(),
    eventEnds: new Date("2024-11-30").getTime(),
    link: "/randzu/global",
  },
  {
    name: "Arkanoid competition",
    description: "This time players can meet up and play together",
    eventStarts: new Date("2024-02-01").getTime(),
    eventEnds: new Date("2024-11-30").getTime(),
    link: "/arkanoid/competitions",
  },
];

export const getEventType = (event: ZkNoidEvent): ZkNoidEventType => {
  const now = Date.now();

  if (event.eventStarts > now) return ZkNoidEventType.UPCOMING_EVENTS;

  if (event.eventEnds > now) return ZkNoidEventType.CURRENT_EVENTS;

  return ZkNoidEventType.PAST_EVENTS;
};

const getEventTime = (event: ZkNoidEvent) => {
  const now = DateTime.now();
  let comparedTime;

  if (event.eventStarts > now.toMillis()) {
    comparedTime = event.eventStarts;
  } else if (event.eventEnds > now.toMillis()) {
    comparedTime = event.eventEnds;
  } else {
    comparedTime = event.eventEnds;
  }

  return Interval.fromDateTimes(now, DateTime.fromMillis(comparedTime))
    .toDuration(["days", "hours", "minutes", "seconds"])
    .toObject();
};

export const useEventTimer = (event: ZkNoidEvent) => {
  const [type, setType] = useState<ZkNoidEventType>(getEventType(event));
  const [startsIn, setStartsIn] = useState<DurationObjectUnits>(
    getEventTime(event)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newType = getEventType(event);
      const newTime = getEventTime(event);

      setType(newType);
      setStartsIn(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [event]);

  return { type, startsIn };
};
