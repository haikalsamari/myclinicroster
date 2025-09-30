export const LOCAL_STORAGE_KEYS = {
    ROSTER: 'rosters',
    STAFF: 'staffs',
    TAGS: 'tags'
}

export type StorageKey = typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS];

export interface StorageService {
    load<T>(key: StorageKey): T | null;
    save<T>(key: StorageKey, data: T): void;
    update<T>(key: StorageKey, updateFn: (updatedData: T | null) => T): void;
    remove(key: StorageKey): void;
}

class LocalStorageService implements StorageService {
    load<T>(key: StorageKey): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error loading data for key ${key}:`, error);
            return null;
        }
    }

    save<T>(key: StorageKey, data: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving data for key ${key}:`, error);
        }
    }

    update<T>(key: StorageKey, updateFn: (updatedData: T | null) => T): void {
        try {
            const updatedData = this.load<T>(key);
            const updateData = updateFn(updatedData);
            this.save(key, updateData);
        } catch (error) {
            console.error(`Error updating data for key ${key}:`, error);
        }
    }
    remove(key: StorageKey): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing data for key ${key}:`, error);
        }
    }
}

export const storageService = new LocalStorageService();