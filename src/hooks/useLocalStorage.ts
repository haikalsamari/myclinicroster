// import { useEffect, useState } from "react";

import { storageService, type StorageKey } from "@/services/rosterService";
import { useEffect, useState } from "react";

// export function useLocalStorage<T>(key: string, initialValue: T) {
//     const [storedValue, setStoredValue] = useState<T | null>(null);

//     useEffect(() => {
//         const load = async () => {
//             try {
//                 const item = localStorage.getItem(key);
//                 const value = item ? JSON.parse(item) : initialValue;
//                 setStoredValue(value);
//             } catch (error) {
//                 console.error(error);
//                 setStoredValue(initialValue);
//             }
//         };
//         load();
//     }, [key]);

//     const setValue = (value: T) => {
//         try {
//             setStoredValue(value);
//             localStorage.setItem(key, JSON.stringify(value));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return [storedValue ?? initialValue, setValue] as const;
// }

export function useLocalStorage<T>(key: StorageKey, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T | null>(null);

    useEffect(() => {
        const value = storageService.load<T>(key) ?? initialValue;
        setStoredValue(value);
    }, [key]);

    const setValue = (value: T) => {
        setStoredValue(value);
        storageService.save(key, value);
    }

    return [storedValue ?? initialValue, setValue] as const;
}

