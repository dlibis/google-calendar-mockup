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
export const formateDateObject = (date) => {
  const clonedObject = { ...date.toObject() };

  const formattedObject = {
    day: clonedObject.date,
    month: clonedObject.months,
    year: clonedObject.years,
    isCurrentMonth: clonedObject.months === dayjs().month(),
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

  let allDates = [];
  let weekDates = [];

  let weekCounter = 1;

  while (currentDate.weekday(0).toObject().months !== nextMonth) {
    const formatted = formateDateObject(currentDate);

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

export const getWeekDays = () => {
  const weekDays: string[] = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(dayjs().weekday(i).format("ddd"));
  }
  return weekDays;
};
