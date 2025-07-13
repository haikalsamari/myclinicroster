import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import CalendarCellModal from "./CalendarCellModal";
import type { Roster } from "../../types/roster";

interface CalendarCellProps {
    isToday: boolean,
    date: Date | null,
    roster: Roster;
    setRoster: (roster: Roster) => void;
}

export default function CalendarCell({isToday, date, roster, setRoster}: CalendarCellProps) {
    const [openCellModal, setOpenCellModal] = useState(false);

    const getRosterEntries = () => {
        if (!date) return [];
        
        const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
        const day = date.getDate();

        const dayRoster = roster[monthYearKey]?.[day];
        if (!dayRoster) return [];

        return Object.entries(dayRoster).map(([tagLabel, shiftAssignment]) => ({
            tagLabel,
            ...shiftAssignment
        }));
    };

    const rosterEntries = getRosterEntries();
    

    return (
        <>
            <div>
                <div
                    className={`h-32 border border-1 border-gray-200 print:border-black 
                        ${isToday ? 'bg-primary text-white print:text-black' : date ? 'bg-white text-black print:text-black' : 'bg-gray-200 print:text-black'}`}
                    >
                    <div className="flex items-start justify-between px-2 text-sm font-bold">
                        <span>{date?.getDate() ?? ''}</span>
                        {date && <FiEdit className="mt-1 cursor-pointer hover:text-primary no-print" onClick={() => setOpenCellModal(true)}></FiEdit>}
                        <CalendarCellModal
                            selectedDate={date}
                            isOpen={openCellModal}
                            onClose={() => setOpenCellModal(false)}
                            roster={roster}
                            setRoster={setRoster}
                        />
                    </div>
                    <div className="px-2 pt-1 font-inter">
                        {rosterEntries.map(({tag, staff}) => (
                            <div className="flex flex-row items-center">
                                <p className={`font-inter font-semibold text-sm mb-1 mr-2 w-[30px] border-r-2 border-gray-200 print:border-black print:text-primary ${isToday ? 'text-white' : 'text-primary'}`}>{tag.label}</p>
                                {/* <div className="w-[10px] h-[20px] border border-black"></div> */}
                                {staff.map((member) => (
                                    <div key={member.id} className="flex flex-row items-center justify-start gap-1">
                                        {/* <div 
                                            className="w-4 h-3 rounded-full" 
                                            style={{ backgroundColor: member.color }} 
                                        /> */}
                                        <div className="text-sm font-medium w-full rounded-sm flex items-center mr-2">{member.name}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>              
                </div>
            </div>
        </>
    )
}