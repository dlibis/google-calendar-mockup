import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { formateDateObject } from "@/utils/utils";
export const useChangeMonth = () => {
  const now = dayjs();
  const [currentMonth, setCurrentMonth] = useState(now);

  const [allDates, setAllDates] = useState<Record<string, any>[]>([]);

  const nextMonth = () => {
    const plus = currentMonth.add(1, "month");

    setCurrentMonth(plus);
  };

  const prevMonth = () => {
    const minus = currentMonth.subtract(1, "month");

    setCurrentMonth(minus);
  };

  const getAllDays = useCallback(() => {
    let currentDate = currentMonth.startOf("month").weekday(0);
    const nextMonth = currentMonth.add(1, "month").month();
    let allDatesLocal: Record<string, any>[] = [];
    let weekDates: Record<string, any>[] = [];

    let weekCounter = 1;

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formatted = formateDateObject(currentDate);

      weekDates.push(formatted);

      if (weekCounter === 7) {
        allDatesLocal.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, "day");
    }
    setAllDates(allDatesLocal);
    return allDates;
  }, [currentMonth]);

  useEffect(() => {
    getAllDays();
  }, [currentMonth]);

  return {
    nextMonth,
    prevMonth,
    currentMonth,
    allDates,
  };
};
