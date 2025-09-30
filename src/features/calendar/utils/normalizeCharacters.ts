export default function normalizeCharacters(text: string): string {
    if (!text) {
        return "";
    }

    const parts = text.toLowerCase().split(" ");
    if (parts.length > 1) {
        return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}