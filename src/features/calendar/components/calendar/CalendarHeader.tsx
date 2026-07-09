import { useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { monthNames } from "../../utils/daysMonths";

interface CalendarHeaderProps {
    currentMonth: number;
    currentYear: number;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    canGoPrevious?: boolean;
    canGoNext?: boolean;
}

export function CalendarHeader({currentMonth, currentYear, onPreviousMonth, onNextMonth, canGoPrevious = true, canGoNext = true}: CalendarHeaderProps) {
    const [prankSide, setPrankSide] = useState<'previous' | 'next' | null>(null);
    const prankTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const triggerPrank = (side: 'previous' | 'next') => {
        setPrankSide(side);
        clearTimeout(prankTimeoutRef.current);
        prankTimeoutRef.current = setTimeout(() => setPrankSide(null), 1500);
    }

    return (
        <div className="grid grid-cols-3 items-center my-2 text-primary">
            <div className="text-left">
                <p> </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-6">
                <div className="relative">
                    <IoIosArrowDropleft
                        onClick={canGoPrevious ? onPreviousMonth : () => triggerPrank('previous')}
                        className={`px-2 py-1 w-12 h-12 no-print ${canGoPrevious ? 'cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
                    />
                    {prankSide === 'previous' && (
                        <span className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold bg-black text-white px-2 py-1 rounded no-print">
                            Click apa tuu?
                        </span>
                    )}
                </div>
                <h2 className="font-bold text-4xl">{monthNames[currentMonth]} {currentYear}</h2>
                <div className="relative">
                    <IoIosArrowDropright
                        onClick={canGoNext ? onNextMonth : () => triggerPrank('next')}
                        className={`px-2 py-1 w-12 h-12 no-print ${canGoNext ? 'cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
                    />
                    {prankSide === 'next' && (
                        <span className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold bg-black text-white px-2 py-1 rounded no-print">
                            Click apa tuu?
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}