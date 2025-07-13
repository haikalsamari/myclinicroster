import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const item = localStorage.getItem(key);
                const value = item ? JSON.parse(item) : initialValue;
                setStoredValue(value);
            } catch (error) {
                console.error(error);
                setStoredValue(initialValue);
            }
        };
        load();
    }, [key]);

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    // return [storedValue, setValue] as const;
    return [storedValue ?? initialValue, setValue] as const;
}