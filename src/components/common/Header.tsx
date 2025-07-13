import StaffModal from "@/features/staff/components/StaffModal";
import { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { Button } from "../ui/button";

interface HeaderProps {
    onPrint: () => void;
}

export default function Header({onPrint}: HeaderProps) {
    const [openStaffModal, setOpenStaffModal] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center justify-between font-inter">
                <div>
                    <p className="font-bold text-xl">My<span className="text-primary">ClinicRoster</span></p>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <div className="flex justify-end">
                        <Button className="border rounded-sm text-white hover:bg-gray-200" variant={"default"} onClick={() => setOpenStaffModal(true)}>Manage Staff</Button>
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