import { useState } from "react";

export function useCalendarNavigation(initialMonth: number, initialYear: number) {
    const [currentMonth, setCurrentMonth] = useState<number>(initialMonth);
    const [currentYear, setCurrentYear] = useState<number>(initialYear);

    // Navigation is bounded to January of the current year through January of the
    // next year, so staff can only plan the roster forward, not revisit past months.
    const minYear = new Date().getFullYear();
    const maxYear = minYear + 1;

    const canGoPrevious = !(currentYear === minYear && currentMonth === 0);
    const canGoNext = !(currentYear === maxYear && currentMonth === 0);

    const previousMonth = () => {
        if (!canGoPrevious) return;

        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((year) => year -1);
        }
        else {
            setCurrentMonth((month) => month - 1);
        }
    }

    const nextMonth = () => {
        if (!canGoNext) return;

        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((year) => year + 1);
        }
        else {
            setCurrentMonth((month) => month + 1);
        }
    }

    return {
        currentMonth,
        currentYear,
        previousMonth,
        nextMonth,
        canGoPrevious,
        canGoNext
    }
}