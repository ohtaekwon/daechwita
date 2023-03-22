import React from "react";
import { getAllResumes, getLatestResume } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";

import Section from "components/section";
import BackGround from "components/background";
import { useQueries, useQuery } from "react-query";

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
  // const { data } = useQuery("ket", () => getAllResumes());
  const [resumes, setResumes] = React.useState<ResumesResponse[]>([]);

  // console.log(data);

  React.useEffect(() => {
    getLatestResume().then((res) => {
      console.log(res);
    });
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
