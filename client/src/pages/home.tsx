import React from "react";
import { getAllResumes } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";

import Section from "components/section";
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
