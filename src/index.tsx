import CalendarContainer from "./features/calendar/components/calendar/CalendarContainer";
import Header from "./components/common/Header";
import { useRef } from "react";
import { usePrintToPDF } from "./hooks/usePrintToPDF";

export default function IndexPage() {
    const calendarRef = useRef<HTMLDivElement>(null);
    const handlePrint = usePrintToPDF(calendarRef);
    
    return (
        <>
            <div className="pt-6 px-20">
                <Header onPrint={handlePrint}></Header>
                <div ref={calendarRef} className="w-full print:w-[1400px] mx-auto">
                    <CalendarContainer></CalendarContainer>
                </div>
            </div>
        </>
    )
}