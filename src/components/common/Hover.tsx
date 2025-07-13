interface HoverProps {
    message: string;
}

export default function Hover({message}: HoverProps) {
    return (
        <>
            <div className="w-max max-w-[250px] font-semibold px-3 py-2 shadow-sm bg-white border rounded-md text-xs text-primary">
                {message}
            </div>
        </>
    )
}