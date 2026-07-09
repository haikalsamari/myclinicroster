import CalendarContainer from "./features/calendar/components/calendar/CalendarContainer";
import Header from "./components/common/Header";
import { useRef } from "react";
import { usePrintToPDF } from "./hooks/usePrintToPDF";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "./services/rosterService";
import { ALL_STATES_OPTION } from "./features/calendar/utils/malaysiaStates";
// import CalendarSideNote from "./features/calendar/components/calendar/CalendarSideNote";

export default function IndexPage() {
    const calendarRef = useRef<HTMLDivElement>(null);
    const handlePrint = usePrintToPDF(calendarRef);
    const [selectedState, setSelectedState] = useLocalStorage<string>(LOCAL_STORAGE_KEYS.SELECTED_STATE, ALL_STATES_OPTION);

    return (
        <>
            <div className="px-6">
                <Header onPrint={handlePrint} selectedState={selectedState} onStateChange={setSelectedState}></Header>
                <div ref={calendarRef} className="w-full print:w-[1400px] mx-auto">
                    <CalendarContainer selectedState={selectedState}></CalendarContainer>
                </div>
            </div>
        </>
    )
}