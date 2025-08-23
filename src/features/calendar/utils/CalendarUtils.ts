import { getDaysInMonth } from "./Days";

export function calculateEmptyCells(currentYear: number, currentMonth: number) {
    const days = getDaysInMonth(currentYear, currentMonth);
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayIndex = days.length + firstDayIndex;

    const calendarCells: (Date | null)[] = Array(35).fill(null);
    for (let i = 0; i < days.length && i + firstDayIndex < 35; i++) {
        calendarCells[i + firstDayIndex] = days[i];
    }

    const missingDays: number[] = [];
    if (lastDayIndex > 35) {
        for (let i = 35; i < lastDayIndex; i++) {
            missingDays.push(i - firstDayIndex);
        }
    }

    if (missingDays.length > 0) {
        let emptyCellIndex = 0;
        for (const day of missingDays) {
            if (emptyCellIndex < firstDayIndex) {
                calendarCells[emptyCellIndex] = days[day];
                emptyCellIndex++;
            }
        }
    }

    return {
        missingDays,
        calendarCells
    }
} 