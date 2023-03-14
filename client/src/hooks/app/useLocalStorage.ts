import React from "react";
import { useEventListener } from "usehooks-ts";

function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = React.useCallback((): T => {
    // "window is undefined" 에러 방지
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = React.useState<T>(readValue);
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = React.useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  useEventListener("storage", handleStorageChange);
  useEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue] as const;
}
export default useLocalStorage;
