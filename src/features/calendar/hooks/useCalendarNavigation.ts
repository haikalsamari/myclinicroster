import { useState } from "react";

export function useCalendarNavigation(initialMonth: number, initialYear: number) {
    const [currentMonth, setCurrentMonth] = useState<number>(initialMonth);
    const [currentYear, setCurrentYear] = useState<number>(initialYear);

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((year) => year -1);
        }
        else {
            setCurrentMonth((month) => month - 1);
        }
    }

    const nextMonth = () => {
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
        nextMonth
    }
}