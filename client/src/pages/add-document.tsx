import Section from "components/section";
import useFetch from "hooks/app/useFetch";
import { getDocuments } from "lib/apis/api/documents";
import { getDocumentsList } from "lib/apis/service/getDocumentsList";
import React from "react";

const AddDocument = () => {
  const { payload } = useFetch("documents");

  const [documents, setDocuments] = React.useState([]);

  const newData = getDocumentsList(payload as any);
  // console.log(newData);

  return (
    <>
      <Section>
        {newData.map((data) => (
          <div>{data.text}</div>
        ))}
      </Section>
    </>
  );
};
export default AddDocument;
