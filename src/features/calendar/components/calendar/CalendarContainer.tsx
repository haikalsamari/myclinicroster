import CalendarCell from "./CalendarCell";
import { useCalendarNavigation } from "../../hooks/useCalendarNavigation";
import { calculateEmptyCells } from "../../utils/calculateEmptyCells";
import { CalendarHeader } from "./CalendarHeader";

export default function CalendarContainer() {
    const today = new Date();
    const {currentMonth, currentYear, nextMonth, previousMonth} = useCalendarNavigation(today.getMonth(), today.getFullYear());
    const {calendarCells} = calculateEmptyCells(currentYear, currentMonth);
    
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayListRendered = dayList.map((day) => (
        <div 
            key={day} 
            className={`border border-1 border-gray-200 print:border-black py-2
                ${day === 'Sunday' ? 'rounded-tl-sm print:rounded-tl-sm' : ''}
                ${day === 'Saturday' ? 'rounded-tr-sm print:rounded-tr-sm' : ''}`
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
            />    
        )
    })

    return (
        <div className="mt-2 mb-10 font-inter">
            <CalendarHeader 
                currentMonth={currentMonth} 
                currentYear={currentYear} 
                onNextMonth={nextMonth} 
                onPreviousMonth={previousMonth}
            />
            <div className="border border-1 rounded-lg">
                <div className="grid grid-cols-7 text-center font-semibold text-sm">
                    {dayListRendered}
                </div>

                <div className="grid grid-cols-7 grid-rows-5 text-left h-full">
                    {calendarCellsRendered}
                </div>
            </div>
        </div>
    )
}