import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { monthNames } from "../../utils/Days";

interface CalendarHeaderProps {
    currentMonth: number;
    currentYear: number;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
}

export function CalendarHeader({currentMonth, currentYear, onPreviousMonth, onNextMonth}: CalendarHeaderProps) {
    return (
        <div className="grid grid-cols-3 items-center my-2 text-primary">
            <div className="text-left">
                <p> </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-6">
                <IoIosArrowDropleft 
                    onClick={onPreviousMonth} 
                    className="px-2 py-1 w-12 h-12 cursor-pointer no-print"
                />
                <h2 className="font-bold text-4xl">{monthNames[currentMonth]} {currentYear}</h2>
                <IoIosArrowDropright 
                    onClick={onNextMonth} 
                    className="px-2 py-1 w-12 h-12 cursor-pointer no-print"
                />
            </div>
        </div>
    )
}