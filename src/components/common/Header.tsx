import StaffModal from "@/features/staff/components/StaffModal";
import { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { ALL_STATES_OPTION, MALAYSIA_STATES } from "@/features/calendar/utils/malaysiaStates";

interface HeaderProps {
    onPrint: () => void;
    selectedState: string;
    onStateChange: (state: string) => void;
}

export default function Header({onPrint, selectedState, onStateChange}: HeaderProps) {
    const [openStaffModal, setOpenStaffModal] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center justify-between font-inter py-4">
                <div>
                    <p className="font-bold text-xl">My<span className="text-primary">ClinicRoster</span></p>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <Select value={selectedState} onValueChange={onStateChange}>
                        <SelectTrigger className="w-[180px] bg-gray-200 hover:cursor-pointer">
                            <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-white hover:cursor-pointer">
                            <SelectItem value={ALL_STATES_OPTION}>{ALL_STATES_OPTION}</SelectItem>
                            {MALAYSIA_STATES.map((state) => (
                                <SelectItem key={state} value={state} className="hover:cursor-pointer hover:bg-gray-200">{state}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex justify-end">
                        <Button
                            className="border rounded-lg text-white hover:bg-gray-200"
                            variant={"default"}
                            onClick={() => setOpenStaffModal(true)}
                            >
                                Manage Staff
                        </Button>
                        <StaffModal
                            isOpen={openStaffModal}
                            onClose={() => setOpenStaffModal(false)}
                        />
                    </div>
                    <LuDownload
                        className="w-6 h-6 cursor-pointer text-primary"
                        onClick={onPrint} title="Download as PDF"
                    />
                </div>
            </div>
        </>
    )

}