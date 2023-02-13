import React from "react";

function useInput(initialValue: string) {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  return [value, handleChange, setValue] as const;
}
export default useInput;
