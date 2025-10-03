import Hover from "@/components/common/Hover";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Staff } from "@/features/staff/types/staff"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import type { Roster } from "../../types/roster";
import { LOCAL_STORAGE_KEYS } from "@/services/rosterService";
import { getDayMonthYear } from "../../utils/daysMonths";
import { tagConfig } from "../../utils/tagConfig";

interface SelectedStaff {
    id: number;
    name: string;
    color: string;
    note?: string;
}

interface SelectedTag {
    name: string;
    label: string;
}

interface CalendarCellFormProps {
    selectedDate: Date | null;
    onSubmit: (data: { 
        selectedDate: Date, 
        selectedStaffs: SelectedStaff[], 
        selectedTag: SelectedTag,
    }) => void;
    roster: Roster;
    setRoster: (roster: Roster) => void;
}

export default function CalendarCellForm({selectedDate, onSubmit, roster}: CalendarCellFormProps) {
    // const [roster] = useLocalStorage<Roster>("rosters", {});
    // const [staffList] = useLocalStorage<Staff[]>("staffs", []);
    // const [roster] = useLocalStorage<Roster>(LOCAL_STORAGE_KEYS.ROSTER, {});
    const [staffs] = useLocalStorage<Staff[]>(LOCAL_STORAGE_KEYS.STAFF, []);

    const [selectedStaffs, setSelectedStaffs] = useState<SelectedStaff[] | []>([]);
    const [selectedTag, setSelectedTag] = useState<SelectedTag | null>(null);
    const [note, setNote] = useState<string>("");

    const isStaffAssigned = (staffId: number) => {
        if (!selectedDate) return false;
        
        const {monthYearKey, dayKey} = getDayMonthYear(selectedDate);
        const dayRoster = roster[monthYearKey]?.[dayKey];
        
        if (!dayRoster) return false;

        return Object.values(dayRoster).some(shift => 
            shift.staff.some(member => member.id === staffId)
        );
    };
    
    const handleSelectedStaff = (value: string) => {
        const staff = staffs.find(staff => staff.id === parseInt(value));
        if (staff) {
            if (selectedStaffs.length > 2) return;
            if (selectedStaffs.some(selectedStaff => selectedStaff.id === staff.id)) return;

            setSelectedStaffs(prev => [
                ...prev, 
                {
                    id: staff.id,
                    name: staff.name,
                    color: staff.color,
                    note: ""
                }]
            );
            setNote("");
        }
    }

    const handleSelectedTag = (value: string) => {
        const selectedField = tagConfig.fields.find((field:{ name: string; label: string; color: string; }) => field.label === value);
        if (selectedField) {
            setSelectedTag({
                name: selectedField.name,
                label: selectedField.label,
            });
        }
    }

    // const handlenote = (value: string) => {
    //     if (value) {
    //         setN(value);
    //     }
    // }

    const handleSubmit = () => {
        if (!selectedDate || selectedStaffs.length === 0 || !selectedTag) return;

        const staffsWithNote = selectedStaffs.map(s => ({
            ...s,
            note: note
        }));

        onSubmit({
            selectedDate,
            selectedStaffs: staffsWithNote,
            selectedTag
        });

        setSelectedTag(null);
        setSelectedStaffs([]);
        setNote("");
    }
    
    return (
        <div className="flex flex-col justify-between bg-white">
            <div>
                {/* Select Staff heading */}
                <div className="flex flex-row items-center gap-2">
                    <DialogTitle className="mb-4">Select Staff</DialogTitle>
                    <div className="relative group w-fit">
                        <BsQuestionCircle className="text-primary text-lg cursor-pointer mb-4"/>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <Hover message="Select staff from list" />
                        </div>
                    </div>
                </div>

                {/* Select Staff Selection Component */}
                <Select onValueChange={(handleSelectedStaff)}>
                    <SelectTrigger className="w-full py-5 rounded-lg border border-gray-300 focus:outline-primary">
                        <SelectValue placeholder="Select Staff" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                            {staffs.length > 0 
                                ? staffs.map((staff) => {
                                    const isAssigned = isStaffAssigned(staff.id);
                                    return (
                                        <SelectItem 
                                            key={staff.id} 
                                            value={staff.id.toString()}
                                            disabled={isAssigned}
                                        >
                                            <div className="flex items-center gap-2 font-medium font-inter">
                                                <div 
                                                    className="w-4 h-4 rounded-full" 
                                                    style={{ backgroundColor: staff.color }} 
                                                />
                                                <span className={isAssigned ? "text-gray-400" : ""}>
                                                    {staff.name}
                                                    {isAssigned && " (Assigned)"}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    );
                                })
                                : <div className="text-sm p-2 text-gray-400">No staff is available</div>
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-6">
                {/* Select Staff heading */}
                <div className="flex flex-row items-center gap-2">
                    <DialogTitle className="mb-4">Select Tag</DialogTitle>
                    <div className="relative group w-fit">
                        <BsQuestionCircle className="text-primary text-lg cursor-pointer mb-4"/>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <Hover message="Select tag from list" />
                        </div>
                    </div>
                </div>

                {/* Select Tag Selection Component */}
                <div>
                    <Select onValueChange={(handleSelectedTag)}>
                        <SelectTrigger className="w-full py-5 rounded-lg border border-gray-300 focus:outline-primary">
                            <SelectValue placeholder="Select Tag" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectGroup>
                                {tagConfig.fields.map((field:{ name: string; label: string; color: string; }) => (
                                    <SelectItem 
                                        key={field.name} 
                                        value={field.label}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between w-full gap-2 py-1">
                                            <p className="font-bold text-primary font-inter" style={{ color: field.color }}>
                                                {field.label}
                                            </p>
                                            <span className="text-xs text-gray-500 font-inter">
                                                {field.name}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>     
                    </Select>
                </div>
            </div>

            <div className="my-6">
                {/* Select Staff heading */}
                <div className="flex flex-row items-center gap-2">
                    <DialogTitle className="mb-4">Add Side Note</DialogTitle>
                    <div className="relative group w-fit">
                        <BsQuestionCircle className="text-primary text-lg cursor-pointer mb-4"/>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <Hover message="Add side note about selected staff"/>
                        </div>
                    </div>
                </div>

                {/* Enter side note */}
                <div>
                    <textarea 
                        className="w-full border border-gray-300 rounded-lg focus:outline-primary placeholder:text-sm px-2 py-1 h-[150px] text-sm" 
                        placeholder="Add Side Note..."
                        value={note}
                        onChange={(e) => setNote((e.target.value))}
                    />
                </div>
            </div>

            {/* Submission Button */}
            <Button className="w-full h-10 rounded-lg text-white" variant="default" onClick={handleSubmit}>Confirm</Button>
        </div>
    )
}