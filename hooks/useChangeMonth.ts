import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { formateDateObject } from "@/utils/utils";
export const useChangeMonth = () => {
  const now = dayjs();
  const [currentMonth, setCurrentMonth] = useState(now);

  const [allDates, setAllDate] = useState([]);

  const nextMonth = () => {
    const plus = currentMonth.add(1, "month");

    setCurrentMonth(plus);
  };

  const prevMonth = () => {
    const minus = currentMonth.subtract(1, "month");

    setCurrentMonth(minus);
  };

  const getAllDays = useCallback(() => {
    console.log("here");
    let currentDate = currentMonth.startOf("month").weekday(0);
    const nextMonth = currentMonth.add(1, "month").month();

    let allDatesLocal = [];
    let weekDates = [];

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

    console.log(allDatesLocal);
    setAllDate(allDatesLocal);
    //return allDates;
  }, [currentMonth]);

  useEffect(() => {
    console.log("testststt");
    getAllDays();
  }, [currentMonth]);

  return {
    nextMonth,
    prevMonth,
    currentMonth,
    allDates,
  };
};
