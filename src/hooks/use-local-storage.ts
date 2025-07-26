import { SetStateAction, useEffect, useState } from "react";

const isServer = typeof window === "undefined";

export default function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: SetStateAction<T>) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => initialValue);

    /* prevents hydration error so that state is only initialized after server is defined */
    useEffect(() => {
        const initialize = () => {
            if (isServer) {
                return initialValue;
            }
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.log(error);
                return initialValue;
            }
        };

        if (!isServer) {
            setStoredValue(initialize());
        }
    }, [initialValue, key]);

    const setValue = (value: SetStateAction<T>) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
