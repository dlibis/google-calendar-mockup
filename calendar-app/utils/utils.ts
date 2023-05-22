import dayjs from "dayjs";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import weekdayPlugin from "dayjs/plugin/weekday";
import locale from "dayjs/locale/cs";
dayjs.extend(isTodayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(weekdayPlugin);

export const getDaysInMonth = (month = 1) => {
  const days = dayjs()
    .month(month - 1) // january is 0
    .daysInMonth();
  return days;
};
export const formateDateObject = (date, currentMonth) => {
  const clonedObject = { ...date.toObject() };

  const formattedObject = {
    day: clonedObject.date,
    month: clonedObject.months,
    year: clonedObject.years,
    dayjsDate: date,
    isCurrentMonth: clonedObject.months === currentMonth.month(),
    isCurrentDay: date.isToday(),
  };

  return formattedObject;
};

export const getAllDays = (currentMonth) => {
  const now = dayjs().locale({
    ...locale,
  });
  let currentDate = currentMonth.startOf("month").weekday(0);
  const nextMonth = currentMonth.add(1, "month").month();

  let allDates: Record<string, any>[] = [];
  let weekDates: {
    day: number;
    month: number;
    year: number;
    dayjsDate: dayjs.Dayjs;
    isCurrentMonth: boolean;
    isCurrentDay: boolean;
  }[] = [];

  let weekCounter = 1;

  while (currentDate.weekday(0).toObject().months !== nextMonth) {
    const formatted = formateDateObject(currentDate, currentMonth);

    weekDates.push(formatted);

    if (weekCounter === 7) {
      allDates.push({ dates: weekDates });
      weekDates = [];
      weekCounter = 0;
    }

    weekCounter++;
    currentDate = currentDate.add(1, "day");
  }

  return allDates;
};

export const getWeekDays = (format = "ddd") => {
  const weekDays: string[] = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(dayjs().weekday(i).format(format));
  }
  return weekDays;
};
