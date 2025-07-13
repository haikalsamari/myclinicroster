import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import type { Staff } from "@/features/staff/types/staff";
import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import { formConfig } from "../utils/FormConfig";
import StaffHover from "../../../components/common/Hover";

interface StaffFormProps {
    onSubmit: (staff: Omit<Staff, "id">) => void;
}

export default function StaffForm({onSubmit}: StaffFormProps) {
    const [, setId] = useState<number | 0>(0);
    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const handleSubmit = () => {
        if (!name.trim() || !color) return;

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
                        <div className="py-2" key={field.name}>
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
                                            className="w-full h-10 px-2 mr-4 mb-4 border border-gray-300 rounded-sm focus:border-blue-500 placeholder:text-sm"
                                            placeholder={field.placeholder}
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            required={field.required}
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
                    <div className="flex flex-row mt-2 p-2 rounded-sm bg-gray-100 gap-2 items-center">
                        <span
                            className="w-7 h-7 rounded-full border border-gray hover:border-primary"
                            style={{ backgroundColor: color }}
                        />
                        <p className="font-semibold text-sm">selected</p>
                    </div>
                </div>
                <Button className="w-full h-10 mt-4 rounded-sm text-white" variant="default" onClick={handleSubmit}>Add Staff</Button>
            </div>
        </>
    )
}