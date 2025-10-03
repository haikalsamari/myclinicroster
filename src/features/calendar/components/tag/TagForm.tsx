import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { BsQuestionCircle } from "react-icons/bs";
import { useState } from "react";
import type { Tag } from "@/features/calendar/types/tag";
import { formConfig } from "../../utils/tagConfig";
import Hover from "@/components/common/Hover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import normalizeCharacters from "../../utils/normalizeCharacters";

interface TagFormProps {
    onSubmit: (tags: Tag) => void;
}

export default function TagForm({onSubmit}: TagFormProps) {
    const [tagList] = useLocalStorage<Tag[]>("tags", []);
    const [name, setName] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedLabel, setSelectedLabel] = useState<string>("");

    const handleSelectedTag = (selectedValue: string) => {
        const selectedField = formConfig.fields.find((field:{ name: string; label: string; color: string; }) => field.label === selectedValue);
        if (selectedField) {
            setSelectedLabel(selectedValue);
            setSelectedName(selectedField.name);
        }
    }

    const handleSubmit = () => {
        if (name.trim() || label.trim()) {
            setSelectedLabel("");
            setSelectedName("");

            const tag: Tag = {
                name: normalizeCharacters(name.trim()), 
                label: label.trim()
            } 

            const checkTag = tagList.some((existingTag) => 
                existingTag.name === tag.name && 
                existingTag.label === tag.label
            );

            if (!checkTag) {
                onSubmit(tag);
            }
        }
        else if (selectedName && selectedLabel) {
            const tag: Tag = {
                name: selectedName, 
                label: selectedLabel
            } 

            const checkTag = tagList.some((existingTag) => 
                existingTag.name === tag.name && 
                existingTag.label === tag.label
            );

            if (!checkTag) {
                onSubmit(tag);
            }
        }

        setName("");
        setLabel("");
        setSelectedName("");
        setSelectedLabel("");
    }
    return (
        <>
            <div className="flex flex-col justify-between h-[350px] w-[300px]">
                <div>
                    <div className="py-2">
                        <div className="flex flex-row items-center gap-2">
                            <DialogTitle className="mb-4">Select Tag</DialogTitle>
                            <div className="relative group w-fit">
                                <BsQuestionCircle className="text-primary text-lg cursor-pointer mb-4"/>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                    <Hover message="List of Tag Label" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Select onValueChange={(handleSelectedTag)}>
                                <SelectTrigger className="w-full py-5 rounded-sm">
                                    <SelectValue placeholder="Select Tag" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {formConfig.fields.map((field:{ name: string; label: string; color: string; }) => (
                                            <SelectItem 
                                                key={field.name} 
                                                value={field.label}
                                            >
                                                <p className="font-semibold text-primary">{field.label}</p><span className="text-xs text-gray-500">{field.name}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                                  
                            </Select>

                            <p className="mt-2 mb-4 text-xs text-gray-500">Didn't find what you're looking for? Create new one</p>

                            <div className="flex flex-row items-center gap-2">
                                <DialogTitle className="">New Tag</DialogTitle>
                                <div className="relative group w-fit">
                                    <BsQuestionCircle className="text-primary text-lg cursor-pointer"/>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                        <Hover message="Create Your Own Tag Label" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <label className="text-xs font-semibold">Tag Label</label>
                                <input
                                    className="w-full h-10 px-2 mr-4 mb-2 border border-gray-300 rounded-sm focus:border-primary placeholder:text-sm"
                                    placeholder="Example: SD"
                                    maxLength={2}
                                    value={label.toUpperCase()} 
                                    onChange={(e) => setLabel(e.target.value)}
                                />
                                <label className="text-xs font-semibold"text-sm>Tag Name</label>
                                <input
                                    className="w-full h-10 px-2 mr-4 border border-gray-300 rounded-sm focus:border-primary placeholder:text-sm"
                                    placeholder="Example: Special Day"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Button className="w-full h-10 rounded-lg" variant="default" onClick={handleSubmit}>Add Tag</Button>
            </div>
        </>
    )
}