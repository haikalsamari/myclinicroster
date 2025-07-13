import type { Staff } from "@/features/staff/types/staff";
import type { Tag } from "./tag";

export interface ShiftAssignment {
    staff: Staff[];
    tag: Tag;
}

export interface DayRoster {
    [tagLabel: string]: ShiftAssignment;
}

export interface MonthRoster {
    [day: number]: DayRoster;
}

export interface Roster {
    [monthYear: string]: MonthRoster;
}

export interface SelectedStaff {
    id: number;
    name: string;
    color: string;
}

export interface SelectedTag {
    name: string;
    label: string;
}