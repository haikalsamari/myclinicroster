import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TagForm from "./TagForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Tag } from "@/features/calendar/types/tag";
import { BsQuestionCircle } from "react-icons/bs";
import Hover from "@/components/common/Hover";
import { FiMinusCircle } from "react-icons/fi";

interface TagModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TagModal({isOpen, onClose}: TagModalProps) {
    const [tagList, setTagList] = useLocalStorage<Tag[]>("tags", []);
    const totalTags = tagList.length;

    const handleAdd = (tag: Tag) => {
        // const filteredTagList = tag.filter((Tag) => !tagList.some((existingTag) => existingTag.name === Tag.name));
        // setTagList([...tagList, ...filteredTagList]);
        const {name, label} = tag;
        const isDuplicate = tagList.some((tag) => tag.name === name && tag.label === label);

        if (isDuplicate) return; 

        setTagList([...tagList, {name, label}]);
    };

    const handleDelete = (name: string) => {
        const updatedList = tagList.filter((Tag) => Tag.name != name)
        setTagList(updatedList);
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="flex flex-col w-full w-[700px] sm:max-w-[700px] max-h-[700px]">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <TagForm onSubmit={handleAdd}></TagForm>
                            
                            <div className="border-l border-dashed border-gray-400 mx-8 my-2 h-auto" />
                            
                            <div className="flex flex-col w-2xs">
                                <div className="flex items-center gap-2 my-2">
                                    <DialogTitle>
                                        {totalTags < 2 
                                            ? "All Tag "
                                            : "All Tags "}
                                        ({totalTags})
                                    </DialogTitle>
                                    <div className="relative group w-fit">
                                        <BsQuestionCircle className="text-primary text-lg cursor-pointer"/>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                            <Hover message="List of All Selected Tags" />
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-y-auto max-h-[300px]">
                                    {
                                    tagList.length === 0 
                                        ? (<p className="text-primary mt-2 font-semibold">No Tags Selected</p>) 
                                        : (
                                            <ul className="text-md space-y-1">
                                                {tagList.map((Tag) => (
                                                <li key={`${Tag.name}-${Tag.label}`}>
                                                    <div 
                                                        className="flex items-center h-10 w-full mt-2 pl-4 pr-2 border bg-gray-200 border-gray-100 rounded-sm justify-between">
                                                        <p className="font-semibold text-primary">{Tag.label}<span className="text-xs text-black ml-2">{Tag.name}</span></p>
                                                        <div className="flex flex-row items-center gap-2">
                                                            <FiMinusCircle 
                                                                className="h-6 w-6 text-red-800 cursor-pointer" 
                                                                onClick={() => handleDelete(Tag.name)}
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                                ))}
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