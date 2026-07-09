import type { PublicHoliday } from "../types/publicHoliday";
import publicHolidays2026 from "../data/publicHolidays2026.json";
import { ALL_STATES_OPTION } from "./malaysiaStates";

const publicHolidays: PublicHoliday[] = publicHolidays2026;

// "states" is free text scraped from the source site, e.g. "National",
// "National except Johor, Kedah, ...", or "Johor, Kuala Lumpur & Selangor".
const parseStateList = (segment: string): string[] =>
    segment
        .replace(/&/g, ",")
        .split(",")
        .map((state) => state.trim())
        .filter(Boolean);

const appliesToState = (statesField: string, state: string): boolean => {
    const normalized = statesField.trim();

    if (normalized === "National") return true;

    if (normalized.startsWith("National except")) {
        const excludedStates = parseStateList(normalized.replace("National except", ""));
        return !excludedStates.includes(state);
    }

    return parseStateList(normalized).includes(state);
}

export const getPublicHolidays = (date: Date | null, selectedState: string): PublicHoliday[] => {
    if (!date) return [];

    const cellYear = date.getFullYear();
    const cellMonth = date.getMonth() + 1;
    const cellDay = date.getDate();

    return publicHolidays.filter((ph) => {
        const [phYear, phMonth, phDay] = ph.date.split("-").map(Number);
        if (phYear !== cellYear || phMonth !== cellMonth || phDay !== cellDay) return false;

        if (selectedState === ALL_STATES_OPTION) return true;

        return appliesToState(ph.states, selectedState);
    });
}

// The clinic is assumed closed whenever a *new* public holiday starts, but may
// choose to stay open on the day(s) after, as long as it's the same holiday
// continuing from the day before. If a different holiday starts right after
// (or alongside, on a day that also continues a prior one), that day is
// locked too - it's effectively a fresh closure, not a continuation.
export const isPublicHolidayLocked = (date: Date | null, selectedState: string): boolean => {
    if (!date) return false;

    const todayHolidays = getPublicHolidays(date, selectedState);
    if (todayHolidays.length === 0) return false;

    const previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);

    const previousHolidayNames = new Set(getPublicHolidays(previousDay, selectedState).map((ph) => ph.holiday));

    return todayHolidays.some((ph) => !previousHolidayNames.has(ph.holiday));
}
