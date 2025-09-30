import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import type { Staff } from "@/features/staff/types/staff";
import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import { formConfig } from "../utils/FormConfig";
import StaffHover from "../../../components/common/Hover";

interface StaffFormProps {
    onSubmit: (staff: Omit<Staff, "id">) => void;
    countStaffs: number;
}

export default function StaffForm({onSubmit, countStaffs}: StaffFormProps) {
    const [, setId] = useState<number | 0>(0);
    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const handleSubmit = () => {
        if (!name.trim() || !color) return;

        if (countStaffs >= 4 ) {
            alert("You have reach maximum number of staffs")
            return;
        }

        onSubmit({name, color});
        setId(0);
        setName("");
        setColor("");
    }

    return (
        <>
            <div className="flex flex-col justify-between">
                <div>
                    {formConfig.fields.map((field) => (
                        <div key={field.name}>
                            <div className="flex flex-row items-center gap-2">
                                <DialogTitle className="mb-4">{field.label}</DialogTitle>
                                <div className="relative group w-fit">
                                    <BsQuestionCircle className="text-primary text-lg cursor-pointer mb-4"/>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                        <StaffHover message={field.help} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {field.type === "text" ? (
                                        <input
                                            className="w-full h-10 px-2 mr-4 mb-4 border border-gray-300 rounded-lg placeholder:text-sm focus:outline-primary"
                                            placeholder={field.placeholder}
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            required={field.required}
                                            disabled={countStaffs >= 4}
                                        />
                                    ) : field.type === "radio" ? (
                                        <div className="grid grid-cols-5 gap-4 mt-2 place-items-center">
                                            {field.options?.map((option) => (
                                                <label key={option.value} className="flex flex-row items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="color"
                                                        value={option.value}
                                                        checked={color === option.value}
                                                        onChange={() => {setColor(option.value)
                                                            console.log(option.value)}
                                                        }
                                                        disabled={countStaffs >= 4}
                                                        className="hidden"
                                                    />
                                                    <span
                                                        className="w-8 h-8 rounded-full border border-gray hover:border-primary"
                                                        style={{ backgroundColor: option.value }}
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    ) : null    
                                }
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row mt-6 p-2 rounded-lg bg-gray-100 gap-2 items-center">
                        <span
                            className="w-7 h-7 rounded-full border border-gray hover:border-primary"
                            style={{ backgroundColor: color }}
                        />
                        <p className="font-semibold text-sm">selected</p>
                    </div>
                </div>
                <Button 
                    className="w-full h-10 mt-4 rounded-lg text-white" 
                    variant="default" 
                    onClick={handleSubmit} 
                    disabled={countStaffs >= 4}
                    >
                        Add Staff
                </Button>
            </div>
        </>
    )
}