export const capitalizeFirstAlphabet = (string: string): string => {
    try {
        if (!string) {
            return "";
        }
        const parts = string.split(" ");
        if (parts.length > 1) {
            return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    } catch (error) {
        console.error("Error capitalizing first alphabet:", error);
        return "";
    }
} 