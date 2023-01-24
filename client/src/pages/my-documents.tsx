import React, { SyntheticEvent } from "react";
import Button from "_common/components/button";

const MyDocuments = () => {
  const [document, setDocument] = React.useState<string>("");
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  const onChange = (e: SyntheticEvent) => {
    const newDocs = (e.target as HTMLInputElement).value;
    setDocument(newDocs);
  };
  console.log(document);
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={document}
        onChange={onChange}
        placeholder="글을 입력해주세요"
        maxLength={120}
      />
      <Button
        variant="zinc_200"
        paddingY={9}
        paddingX={16}
        fontSize="md"
        lineHeight="md"
        color="zinc_400"
      >
        입력
      </Button>
    </form>
  );
};

export default MyDocuments;
