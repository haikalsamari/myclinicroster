import type { Roster } from "../types/roster";
import { getDayMonthYear } from "../utils/daysMonths";

export function useRoster(date: (Date | null), roster: Roster) {    
    const getRosterEntries = () => {
        if (date == null) return [];

        const {monthYearKey, dayKey} = getDayMonthYear(date);

        const rosterData = roster[monthYearKey]?.[dayKey];
        if (!rosterData) return [];

        return Object
            .entries(rosterData)
            .map(([tagLabel, ShiftAssignment]) => ({
                tagLabel,
                ...ShiftAssignment
        }))
    } 

    // const getMonthlySideNotes = () => {
    //     if (date == null) return [];
    
    //     const {monthYearKey} = getDayMonthYear(date);
    //     const monthRoster = roster[monthYearKey];
    //     if (!monthRoster) return [];
    
    //     const sideNotes: {staffName: string; note: string; tag: string; day: string}[] = [];
    
    //     Object.entries(monthRoster).forEach(([dayKey, dayRoster]) => {
    //         Object.entries(dayRoster).forEach(([tagLabel, shiftAssignment]: any) => {
    //             shiftAssignment.staff.forEach((s: any) => {
    //                 if (s.note) {
    //                     sideNotes.push({
    //                         staffName: s.name,
    //                         note: s.note,
    //                         tag: tagLabel,
    //                         day: dayKey
    //                     });
    //                 }
    //             });
    //         });
    //     });
    
    //     return sideNotes;
    // };

    return {getRosterEntries} as const;
}   