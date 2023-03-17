import React from "react";
import { getAllResumes } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";

import { DndProvider } from "react-dnd";
import Section from "components/section";
import Text from "_common/components/text";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LocalStorageColumn as Column } from "components/column";
import { ColumnType } from "types/index.types";
import { ColumnColorSchema } from "types/schema.types";
import BackGround from "components/background";

type TimeType = {
  seconds: number;
  nanoseconds: number;
};

interface ResumesResponse {
  id: string;
  createdAt: TimeType;
  uid: string;
  imgUrl: string;
  updatedAt: null | TimeType;
  resumes: {
    apply: {
      company: string;
      department: string;
    };
    documents: {
      id: string;
      tag: string;
      text: string;
      title: string;
    }[];
  };
  tag: (string | undefined)[];
}

const Home = () => {
  const [data, setData] = React.useState<any>();
  const [resumes, setResumes] = React.useState<ResumesResponse[]>([]);

  React.useEffect(() => {
    getAllResumes()
      .then(getResumesService)
      .then((res) => setResumes(res));
  }, []);

  return (
    <>
      <Section width="100vw" height="100vh">
        {/* <BackGround /> */}
      </Section>
    </>
  );
};
export default Home;
