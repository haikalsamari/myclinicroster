import { colorOptions } from "./colorOptions";

export const formConfig = {
    fields: [
        {
            name: "addNewStaff",
            label: "New Staff",
            help: "Add new staff by entering their name",
            type: "text",
            placeholder: "Example: Jane Doe",
            required: true
        },
        {
            name: "staffColor",
            label: "Choose Color for Staff",
            help: "Each staff must be assigned to one specific color",
            type: "radio",
            options: colorOptions.colors.map((color) => ({
                label: color.pastelName,
                value: color.hex
            })),
            required: true
        }
    ]
}