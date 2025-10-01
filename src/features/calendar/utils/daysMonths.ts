export const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const getDaysInMonth = (year: number, month: number): Date[] => {
    const days: Date[] = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export const getDayMonthYear = (date: Date) => {
    const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
    const dayKey = date.getDate();

    return {monthYearKey, dayKey} as const;
}
