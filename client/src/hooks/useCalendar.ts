import { useState } from "react";

export interface Event {
  title: string;
  start: string;
  end: string;
  date: Date;
  color: string;
}

export const useCalendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  });

  const nextWeek = () => {
    setCurrentWeekStart((prev) => {
      const nextWeekStart = new Date(prev);
      nextWeekStart.setDate(prev.getDate() + 7);
      return nextWeekStart;
    });
  };

  const previousWeek = () => {
    setCurrentWeekStart((prev) => {
      const prevWeekStart = new Date(prev);
      prevWeekStart.setDate(prev.getDate() - 7);
      return prevWeekStart;
    });
  };

  const getWeekDates = (): Date[] =>
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      return date;
    });

  const formatHeaderDateRange = (): string => {
    const endOfWeek = new Date(currentWeekStart);
    endOfWeek.setDate(currentWeekStart.getDate() + 6);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const startDateStr = currentWeekStart.toLocaleDateString("pt-BR", options);
    const endDateStr = endOfWeek.toLocaleDateString("pt-BR", options);
    return `${startDateStr} - ${endDateStr}`;
  };

  const currentMonthYear = (): string =>
    currentWeekStart.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });

  return {
    currentWeekStart,
    nextWeek,
    previousWeek,
    getWeekDates,
    formatHeaderDateRange,
    currentMonthYear,
  };
};
