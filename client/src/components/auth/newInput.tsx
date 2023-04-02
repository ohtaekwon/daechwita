import React from "react";

const NewInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputValueRef = React.useRef(value);

  React.useEffect(() => {
    inputValueRef.current = value;
  }, [value]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue: any = e.target.value;
      if (newValue !== inputValueRef.current) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return <input type="text" value={value} onChange={handleChange} />;
};
export default NewInput;
