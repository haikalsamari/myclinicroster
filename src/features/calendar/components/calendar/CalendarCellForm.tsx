import Hover from "@/components/common/Hover";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Staff } from "@/features/staff/types/staff"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { formConfig } from "../../utils/FormConfig";
import type { Roster } from "../../types/roster";

interface SelectedStaff {
    id: number;
    name: string;
    color: string;
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
        selectedTag: SelectedTag 
    }) => void;
}

export default function CalendarCellForm({selectedDate, onSubmit}: CalendarCellFormProps) {
    const [roster] = useLocalStorage<Roster>("rosters", {});
    const [staffList] = useLocalStorage<Staff[]>("staffs", []);
    const [selectedTag, setSelectedTag] = useState<SelectedTag | null>(null);
    const [selectedStaffs, setSelectedStaffs] = useState<SelectedStaff[]>([]);

    const isStaffAssigned = (staffId: number) => {
        if (!selectedDate) return false;
        
        const monthYearKey = `${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
        const day = selectedDate.getDate();
        const dayRoster = roster[monthYearKey]?.[day];
        
        if (!dayRoster) return false;

        return Object.values(dayRoster).some(shift => 
            shift.staff.some(member => member.id === staffId)
        );
    };

    const handleSelectedTag = (value: string) => {
        const selectedField = formConfig.fields.find(field => field.label === value);
        if (selectedField) {
            setSelectedTag({
                name: selectedField.name,
                label: selectedField.label,
            });
        }
    }
    
    const handleSelectedStaff = (value: string) => {
        const staff = staffList.find(staff => staff.id === parseInt(value));
        if (staff) {
            if (selectedStaffs.length > 2) {
                return;
            }

            if (selectedStaffs.some(selectedStaff => selectedStaff.id === staff.id)) {
                return;
            }

            setSelectedStaffs(prev => [...prev, {
                id: staff.id,
                name: staff.name,
                color: staff.color
            }]);
        }
    }

    const handleSubmit = () => {
        if (!selectedDate || selectedStaffs.length === 0 || !selectedTag) return;

        onSubmit({
            selectedDate,
            selectedStaffs,
            selectedTag
        });

        setSelectedTag(null);
        setSelectedStaffs([]);
    }
    
    return (
        <>
            <div className="flex flex-col justify-between h-[350px] w-[300px] bg-white">
                <div>
                    <div className="py-2">
                        <div className="flex flex-row items-center gap-2">
                            <DialogTitle className="mb-4">Select Tag</DialogTitle>
                            <div className="relative group w-fit">
                                <BsQuestionCircle className="text-primary text-lg cursor-pointer mb-4"/>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                    <Hover message="Select tag from list" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Select onValueChange={(handleSelectedTag)}>
                                <SelectTrigger className="w-full py-5 rounded-lg">
                                    <SelectValue placeholder="Select Tag" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        {formConfig.fields.map((field) => (
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
                        <div className="flex flex-row items-center gap-2 mt-6">
                            <DialogTitle className="mb-4">Select Staff</DialogTitle>
                            <div className="relative group w-fit">
                                <BsQuestionCircle className="text-primary text-lg cursor-pointer mb-4"/>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                    <Hover message="Select staff from list" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Select onValueChange={(handleSelectedStaff)}>
                                <SelectTrigger className="w-full py-5 rounded-lg">
                                    <SelectValue placeholder="Select Staff" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        {staffList.map((staff) => {
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
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                                    
                            </Select>
                        </div>
                    </div>
                </div>
                <Button className="w-full h-10 rounded-lg text-white" variant="default" onClick={handleSubmit}>Confirm</Button>
            </div>
        </>
    )
}