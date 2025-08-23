import CalendarCell from "./CalendarCell";
import type { Roster } from "../../types/roster";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCalendarNavigation } from "../../hooks/useCalendarNavigation";
import { calculateEmptyCells } from "../../utils/CalendarUtils";
import { CalendarHeader } from "./CalendarHeader";

export default function CalendarContainer() {
    const today = new Date();
    const [roster, setRoster] = useLocalStorage<Roster>("rosters", {});
    const {currentMonth, currentYear, nextMonth, previousMonth} = useCalendarNavigation(today.getMonth(), today.getFullYear());
    const {calendarCells, missingDays} = calculateEmptyCells(currentYear, currentMonth);
    
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
    // const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    

    const dayListRendered = dayList.map((day) => (
        <div 
            key={day} 
            className={`border border-1 border-gray-200 print:border-black py-2
                ${day === 'Sunday' ? 'rounded-tl-sm' : ''}
                ${day === 'Saturday' ? 'rounded-tr-sm' : ''}`
            }>
            {day}
        </div>
    ))

    const calendarCellsRendered = calendarCells.map((date, index) => {
        const isToday = date?.getDate() === today.getDate() && 
                        date?.getMonth() === today.getMonth() &&
                        date?.getFullYear() === today.getFullYear();

        return (
            <CalendarCell 
                key={index} 
                isToday={isToday} 
                date={date} 
                roster={roster}
                setRoster={setRoster}>    
            </CalendarCell>
        )
    })

    return (
        <>  
            <div className="mt-2 mb-10 font-inter">
                {/* <div className="grid grid-cols-3 items-center my-2 text-primary">
                    <div className="text-left">
                        <p> </p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-6">
                        <IoIosArrowDropleft onClick={previousMonth} className="px-2 py-1 w-12 h-12 cursor-pointer no-print"/>
                        <h2 className="font-bold text-4xl">{monthNames[currentMonth]} {currentYear}</h2>
                        <IoIosArrowDropright onClick={nextMonth} className="px-2 py-1 w-12 h-12 cursor-pointer no-print"/>
                    </div>
                </div> */}
                <CalendarHeader 
                    currentMonth={currentMonth} 
                    currentYear={currentYear} 
                    onNextMonth={nextMonth} 
                    onPreviousMonth={previousMonth}
                />
                <div className="border border-1 rounded-sm">
                    <div className="grid grid-cols-7 text-center font-semibold text-sm">
                        {dayListRendered}
                    </div>

                    <div className="grid grid-cols-7 grid-rows-5 text-left h-full">
                        {calendarCellsRendered}
                    </div>
                </div>
            </div>
        </>
    )
}


// Find no. of cells that are empty before first day index.
//     let countEmptyCellsBefore = 0;
//     for (let i = 0; i < firstDayIndex; i++) {
//         countEmptyCellsBefore++;
//     }
//     console.log(`Empty cells before first day index: ${countEmptyCellsBefore}`);

//     // Find no. of cells that are empty after last day index. 
//     let countEmptyCellsAfter = 0;
//     for (let i = 35; i > lastDayIndex; i--) {
//         countEmptyCellsAfter++;
//     }
//     console.log(`Empty cells after last day index: ${countEmptyCellsAfter}`);

//     // Find how many days are missing out of calendar cells limit (35)
//     let countMissingDays = 0;
//     if (lastDayIndex > 35) {
//         countMissingDays++;
//     }
//     console.log(`Missing days: ${countMissingDays}`);

//     const missingDays: number[] = [];
//     if (lastDayIndex > 35) {
//         const overflowCount = lastDayIndex - 35;
//         console.log(overflowCount);

//         for (let i = 35; i < lastDayIndex; i++) {
//             missingDays.push(i - firstDayIndex);
//         }
//     }

//     const calendarCells: (Date | null)[] = Array(35).fill(null);
//     for (let i = 0; i < days.length && i + firstDayIndex < 35; i++) {
//         calendarCells[i + firstDayIndex] = days[i];
//     }

//     if (missingDays.length > 0) {
//         let emptySlotIndex = 0;
//         for (const dayIndex of missingDays) {
//             if (emptySlotIndex < firstDayIndex) {
//                 calendarCells[emptySlotIndex] = days[dayIndex];
//                 emptySlotIndex++;
//             }
//         }
//     }

//     const previousMonth = () => {
//         if (currentMonth === 0) {
//             setCurrentMonth(11);
//             setCurrentYear((y) => y - 1);
//         }
//         else {
//             setCurrentMonth((m) => m - 1);
//         }
//     }

//    const nextMonth = () => {
//         if (currentMonth === 11) {
//             setCurrentMonth(0);
//             setCurrentYear((y) => y + 1);
//         }
//         else {
//             setCurrentMonth((m) => m + 1);
//         }
//     }