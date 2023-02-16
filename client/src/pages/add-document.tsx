import useFetch from "hooks/app/useFetch";
import { getDocuments } from "lib/apis/api/documents";
import { getDocumentsList } from "lib/apis/service/getDocumentsList";
import React from "react";

const AddDocument = ({ leftNav }: { leftNav: React.ReactNode }) => {
  const [documents, setDocuments] = React.useState([]);
  const [payload] = useFetch("/documents");
  React.useEffect(() => {
    getDocuments({ title: "네이버 자소서", tag: "자기소개서" }).then((res) =>
      setDocuments(res as any)
    );
  }, []);

  console.log(payload);

  return <div></div>;
};
export default AddDocument;
