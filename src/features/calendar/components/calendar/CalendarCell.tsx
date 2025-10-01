import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import CalendarCellModal from "./CalendarCellModal";
import type { Roster } from "../../types/roster";
import { formConfig } from "../../utils/formConfig";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRoster } from "../../hooks/useRoster";
import { LOCAL_STORAGE_KEYS } from "@/services/rosterService";

interface CalendarCellProps {
    isToday: boolean,
    date: Date | null,
}

export default function CalendarCell({isToday, date}: CalendarCellProps) {
    // const [roster, setRoster] = useLocalStorage<Roster>("rosters", {});
    const [roster, setRoster] = useLocalStorage<Roster>(LOCAL_STORAGE_KEYS.ROSTER, {});
    const [openCellModal, setOpenCellModal] = useState(false);
    const {getRosterEntries} = useRoster(date, roster);
    
    return (
        <>
            <div>
                <div
                    className={`h-40 border border-1 border-gray-200 print:border-black 
                            ${isToday 
                                ? 'bg-primary text-white print:text-black print:bg-transparent' 
                                : date 
                                    ? 'bg-white text-black print:text-black' 
                                    : 'bg-gray-200 print:text-black'
                            }`
                        }
                    >
                    <div className="flex items-start justify-between px-2 text-sm font-bold">
                        <span className="text-md mt-1">{date?.getDate() ?? ''}</span>
                        {date && <FiEdit className="mt-1 cursor-pointer hover:text-primary no-print" onClick={() => setOpenCellModal(true)}></FiEdit>}
                        <CalendarCellModal
                            selectedDate={date}
                            isOpen={openCellModal}
                            onClose={() => setOpenCellModal(false)}
                            roster={roster}
                            setRoster={setRoster}
                        />
                    </div>
                    <div className="px-2 font-inter">
                        {getRosterEntries().map(({tag, staff}) => {
                            const tagConfig = formConfig.fields.find(field => field.label === tag.label);
                            
                            return (
                                <div key={tag.label} className="flex flex-row items-center bg-gray-300 print:!bg-gray-300 p-1 rounded-md mb-1">
                                    <p 
                                        className={`font-inter font-bold text-sm mr-2 w-[30px] border-r-2 border-gray-200 print:border-black`}
                                        style={{ 
                                            color: tagConfig?.color,
                                            borderRightColor: tagConfig?.color 
                                        }}
                                    >
                                        {tag.label}
                                    </p>
                                    {staff.map((member) => (
                                        <div key={member.id} className="flex flex-row items-center justify-center gap-1">
                                            <div className="text-sm font-semibold w-full rounded-sm flex items-center mr-2">
                                                {member.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>                      
                </div>
            </div>
        </>
    )
}