import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BsQuestionCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Staff } from "@/features/staff/types/staff";
import { useState } from "react";
import StaffForm from "./StaffForm";
import customIdentifier from "@/utils/customIdentifier";
import StaffHover from "../../../components/common/Hover";

interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function StaffModal({isOpen, onClose}: StaffModalProps) {
    const [staffList, setStaffList] = useLocalStorage<Staff[]>("staffs", []);
    const [id, setId] = useState<number | 0>(0);
    const [, setName] = useState<string>("");
    const [, setColor] = useState<string>("");
    const totalStaffs = staffList.length;

    const handleAdd = ({ name, color }: Omit<Staff, "id">) => {
        if (!name.trim() || !color) return;

        const staffExists = staffList.find((staff) => (staff.id === id && staff.name === name));
        
        const updatedList = staffExists 
            ? staffList.map((staff) => staff.id === id ? {...staff, name, color} : staff)
            : [...staffList, {id: customIdentifier(staffList), name, color}]; 

        console.log("Saving to localStorage:", updatedList);

        setStaffList(updatedList);

        setId(0);
        setName("");
        setColor("");
    }

    const handleDelete = (id: number) => {
        const updatedList = staffList.filter((staff) => staff.id !== id)
        console.log("Delete staff from localStorage");
        setStaffList(updatedList);
    }

    const renderStaffList = staffList.map((staff) => (
        <li key={staff.id}>
            <div 
                className={`flex items-center h-10 w-full mt-2 pl-4 pr-2 border border-gray-100 rounded-sm justify-between`}
                style={{backgroundColor: staff.color}}>
                <p className="font-semibold text-sm text-white">{staff.name}</p>
                <div className="flex flex-row items-center gap-2">
                    <FiMinusCircle 
                        className="h-6 w-6 text-red-800 cursor-pointer" 
                        onClick={() => handleDelete(staff.id)}
                    />
                </div>
            </div>
        </li>
    ))

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="flex flex-col w-full w-[700px] sm:max-w-[700px] max-h-[400px] bg-white font-inter">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <StaffForm onSubmit={handleAdd}></StaffForm>
                            
                            <div className="border-l border-dashed border-gray-400 mx-8 my-2 h-auto" />
                            
                            <div className="flex flex-col w-1/2 max-h-[400px]">
                                <div className="flex items-center gap-2 my-2">
                                    <DialogTitle className="">
                                    {totalStaffs < 2 
                                        ? "All Available Staff "
                                        : "All Available Staffs "}
                                    ({totalStaffs})
                                    </DialogTitle>
                                    <div className="relative group w-fit">
                                        <BsQuestionCircle className="text-primary text-lg cursor-pointer"/>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                            <StaffHover message="List of available staffs and their assigned color" />
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-y-auto max-h-[300px]">
                                    {
                                    staffList.length === 0 
                                        ? (<p className="text-primary mt-2 font-semibold">No Staff Available</p>) 
                                        : (
                                            <ul className="text-md space-y-1">
                                                {renderStaffList}
                                            </ul>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}