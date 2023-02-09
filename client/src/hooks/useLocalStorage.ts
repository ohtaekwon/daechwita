import React from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const localStorageData = window.localStorage.getItem(key);

      if (!localStorageData) throw new Error("No saved localStorage data");

      const valueToStore =
        value instanceof Function ? value(JSON.parse(localStorageData)) : value;
      console.log("storevalue", storedValue);

      console.log("valueToStore", valueToStore);

      setStoredValue(valueToStore);

      console.log("stroedValue", storedValue);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        console.log("로컬에 저장후 상태", storedValue);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("STORE", storedValue);
  };
  return [storedValue, setValue] as const;
}
export default useLocalStorage;
