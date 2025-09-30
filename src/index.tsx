import CalendarContainer from "./features/calendar/components/calendar/CalendarContainer";
import Header from "./components/common/Header";
import { useRef } from "react";
import { usePrintToPDF } from "./hooks/usePrintToPDF";
// import CalendarSideNote from "./features/calendar/components/calendar/CalendarSideNote";

export default function IndexPage() {
    const calendarRef = useRef<HTMLDivElement>(null);
    const handlePrint = usePrintToPDF(calendarRef);
    
    return (
        <>
            <div className="px-6">
                <Header onPrint={handlePrint}></Header>
                <div ref={calendarRef} className="w-full print:w-[1400px] mx-auto">
                    <CalendarContainer></CalendarContainer>
                    {/* <CalendarSideNote></CalendarSideNote> */}
                </div>
            </div>
        </>
    )
}