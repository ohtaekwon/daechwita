import React from "react";

function useInput(initialValue: string) {
  const [value, setValue] = React.useState(initialValue);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    (inputRef as any).current = value; // *added this line, so it updates the ref as state changes.
  }, [value]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return { value, onChange: handleChange, setValue, inputRef };
}
export default useInput;
