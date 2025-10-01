import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FiMinusCircle } from "react-icons/fi";
import CalendarCellForm from "./CalendarCellForm";
import { produce } from 'immer'; 
import type { Roster, SelectedStaff, SelectedTag } from "../../types/roster";
import { formConfig } from "../../utils/formConfig";
// import { getDayMonthYear } from "../../utils/daysMonths";
import { useRoster } from "../../hooks/useRoster";

interface CalendarCellModalProps {
    selectedDate: Date | null;
    isOpen: boolean;
    onClose: () => void;
    roster: Roster;
    setRoster: (roster: Roster) => void;
}

export default function CalendarCellModal({selectedDate, isOpen, onClose, roster, setRoster}: CalendarCellModalProps) {  
    const {getRosterEntries} = useRoster(selectedDate, roster); 

    const handleFormSubmit = (data: { selectedDate: Date, selectedStaffs: SelectedStaff[], selectedTag: SelectedTag}) => {
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
                        tag: data.selectedTag,
                    }
                }
            }
        };
        setRoster(updatedRoster);
    }

    const handleDeleteStaff = (tagLabel: string, staffId: number) => {
        if (!selectedDate || !staffId || !tagLabel) return;
        
        const monthYearKey = `${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
        const day = selectedDate.getDate();
    
        const updatedRoster = produce(roster, draft => {
            const shift = draft[monthYearKey]?.[day]?.[tagLabel];
            if (shift?.staff) {
                shift.staff = shift.staff.filter(staff => staff.id !== staffId);
            }

            if (shift.staff.length === 0) {
                delete draft[monthYearKey][day][tagLabel];
            }
        });
    
        setRoster(updatedRoster);
    };

    const rosterEntries = getRosterEntries();

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="flex flex-col w-[800px] sm:max-w-[800px] bg-white font-inter">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="w-1/2">
                                <CalendarCellForm 
                                    selectedDate={selectedDate} 
                                    onSubmit={handleFormSubmit}
                                    roster={roster}
                                    setRoster={setRoster}
                                />
                            </div>

                            <div className="border-l border-dashed border-gray-400 mx-8 h-auto" />
                                                        
                            <div className="flex flex-col w-1/2">
                                <div className="flex items-center mb-2">
                                    <DialogTitle>
                                        {selectedDate?.toDateString()}
                                    </DialogTitle>
                                </div>

                                <div className="w-full h-full overflow-y-auto">
                                    {rosterEntries.length === 0 
                                    ? (
                                        <p className="text-primary font-semibold mt-2">No Staff & Tag are selected</p>
                                    ) 
                                    : (
                                        <ul className="text-md">
                                            {rosterEntries.map(({tagLabel, tag, staff}) => {
                                                const tagConfig = formConfig.fields.find((field:{ name: string; label: string; color: string; }) => field.label === tag.label);
                                                
                                                return (
                                                    <li key={tagLabel}>
                                                        <div className="flex flex-col w-full mt-2 p-3 border border-gray-300 rounded-lg">
                                                            <div className="flex justify-between items-center">
                                                                <p className={`font-bold text-primary`} style={{ color: tagConfig?.color }}>
                                                                    {tag.label}
                                                                    <span className="text-xs font-normal text-gray-500 ml-2">
                                                                        {tag.name}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="mt-2">
                                                                {staff.map((s) => (
                                                                    <div 
                                                                        key={s.id}
                                                                        className="flex items-center gap-2 mt-1"
                                                                    >
                                                                        <div 
                                                                            className="text-sm font-semibold w-full h-10 p-2 text-white rounded-lg flex justify-between print:" 
                                                                            style={{ backgroundColor: s.color }}
                                                                        >
                                                                            <div>
                                                                                {s.name}
                                                                                {['OF', 'AL', 'AH', 'UL'].includes(tag.label) && s.note && (
                                                                                    <span className="ml-2">({s.note})</span>
                                                                                )}
                                                                            </div>
                                                                            <FiMinusCircle 
                                                                                className="h-6 w-6 text-red-800 cursor-pointer" 
                                                                                onClick={() => handleDeleteStaff(tagLabel, s.id)}
                                                                            />
                                                                        </div>
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
