import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FiMinusCircle } from "react-icons/fi";
import CalendarCellForm from "./CalendarCellForm";
import type { Roster, SelectedStaff, SelectedTag } from "../../types/roster";
import { BsQuestionCircle } from "react-icons/bs";
import Hover from "@/components/common/Hover";
import { formConfig } from "../../utils/FormConfig";

interface CalendarCellModalProps {
    selectedDate: Date | null;
    isOpen: boolean;
    onClose: () => void;
    roster: Roster;
    setRoster: (roster: Roster) => void;
}

export default function CalendarCellModal({selectedDate, isOpen, onClose, roster, setRoster}: CalendarCellModalProps) {    
    const handleFormSubmit = (data: { 
        selectedDate: Date, 
        selectedStaffs: SelectedStaff[], 
        selectedTag: SelectedTag 
    }) => {
        const monthYearKey = `${data.selectedDate.getMonth() + 1}-${data.selectedDate.getFullYear()}`;
        const day = data.selectedDate.getDate();
        const tagKey = data.selectedTag.label;

        const existingShift = roster[monthYearKey]?.[day]?.[tagKey];

        const updatedRoster: Roster = {
            ...roster,
            [monthYearKey]: {
                ...roster[monthYearKey],
                [day]: {
                    ...roster[monthYearKey]?.[day],
                    [tagKey]: {
                        staff: existingShift 
                            ? [...existingShift.staff, ...data.selectedStaffs]
                            : data.selectedStaffs,
                        tag: data.selectedTag
                    }
                }
            }
        };
        setRoster(updatedRoster);
    }

    const getRosterEntries = () => {
        if (!selectedDate) return [];
        
        const monthYearKey = `${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
        const day = selectedDate.getDate();

        const dayRoster = roster[monthYearKey]?.[day];
        if (!dayRoster) return [];

        return Object.entries(dayRoster).map(([tagLabel, shiftAssignment]) => ({
            tagLabel,
            ...shiftAssignment
        }));
    };

    const handleDelete = (tagLabel: string) => {
        if (!selectedDate) return;
        
        const monthYearKey = `${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
        const day = selectedDate.getDate();
        
        const updatedRoster = {...roster};
        delete updatedRoster[monthYearKey][day][tagLabel];
        setRoster(updatedRoster);
    };

    const rosterEntries = getRosterEntries();

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="flex flex-col w-full w-[700px] sm:max-w-[700px] max-h-[700px] bg-white font-inter">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <CalendarCellForm 
                                selectedDate={selectedDate} 
                                onSubmit={handleFormSubmit}
                            ></CalendarCellForm>

                            <div className="border-l border-dashed border-gray-400 mx-8 my-2 h-auto" />
                                                        
                            <div className="flex flex-col w-1/2">
                                <div className="flex items-center gap-2 my-2">
                                    <DialogTitle>
                                        {selectedDate?.toDateString()}
                                    </DialogTitle>
                                    <div className="relative group w-fit">
                                        <BsQuestionCircle className="text-primary text-lg cursor-pointer"/>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                            <Hover message="List of Assigned Staffs" />
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-y-auto max-h-[300px] w-full">
                                    {rosterEntries.length === 0 
                                    ? (
                                        <p className="text-primary mt-2 font-semibold">No Roster Created</p>
                                    ) 
                                    : (
                                        <ul className="text-md space-y-1">
                                            {rosterEntries.map(({tagLabel, tag, staff}) => {
                                                const tagConfig = formConfig.fields.find(field => field.label === tag.label);
                                                
                                                return (
                                                    <li key={tagLabel}>
                                                        <div className="flex flex-col w-full mt-2 px-3 pb-4 pt-2 border border-gray-200 rounded-sm">
                                                            <div className="flex justify-between items-center">
                                                                <p className={`font-semibold text-primary`} style={{ color: tagConfig?.color }}>
                                                                    {tag.label}
                                                                    <span className="text-xs font-normal text-gray-500 ml-2">
                                                                        {tag.name}
                                                                    </span>
                                                                </p>
                                                                <FiMinusCircle 
                                                                    className="h-6 w-6 text-red-800 cursor-pointer" 
                                                                    onClick={() => handleDelete(tagLabel)}
                                                                />
                                                            </div>
                                                            <div className="mt-2">
                                                                {staff.map((member) => (
                                                                    <div 
                                                                        key={member.id}
                                                                        className="flex items-center gap-2 mt-1"
                                                                    >
                                                                        {/* <div 
                                                                            className="w-3 h-3 rounded-full" 
                                                                            style={{ backgroundColor: member.color }} 
                                                                        /> */}
                                                                        <div className="text-sm font-semibold w-full h-10 p-2 text-white rounded-sm" style={{ backgroundColor: member.color }} >{member.name}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            }
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}