import React from "react";
import Section from "components/section";
import { getUsers } from "lib/apis/api/users";
import Button from "_common/components/button";
import { getAllResumes } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";

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
    getUsers().then((res) => setData(res));
    getAllResumes()
      .then(getResumesService)
      .then((res) => setResumes(res));
  }, []);

  return (
    <>
      <Section
        as="section"
        width="100%"
        height="100%"
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        paddingBottom={10}
        paddingRight={10}
        paddingLeft={10}
        paddingTop={10}
      >
        {/* black */}
        <Button variant={"default"}>default</Button>
        {/* black */}
        <Button variant={"blackText_1_fill"}>blackText_1_fill</Button>
        {/* primary */}
        <Button variant={"primary"}>primary</Button>
        {/* skyblue */}
        <Button variant={"skyblue_100"}>skyblue_100</Button>
        <Button variant={"skyblue_300_fill"}>skyblue_300_fill</Button>
        <Button variant={"skyblue_400"}>skyblue_400</Button>
        <Button variant={"skyblue_400_fill"}>skyblue_400_fill</Button>
        <Button variant={"skyblue_500_fill"}>skyblue_500_fill</Button>
        {/* tdblue */}
        <Button variant={"tdblue_300_fill"}>tdblue_300_fill</Button>
        {/* vermillion */}
        <Button variant={"vermillion_400_fill"}>vermillion_400_fill</Button>
        {/* tdred */}
        <Button variant={"tdred_100"}>tdred_100</Button>
        <Button variant={"tdred_400"}>tdred_400</Button>
        <Button variant={"tdred_400_fill"}>tdred_400_fill</Button>
        {/* zinc */}
        <Button variant={"zinc_200"}>zinc_200</Button>
        <Button variant={"zinc_200_filled"}>zinc_200_filled</Button>
        <Button variant={"zinc_200_reverse"}>zinc_200_reverse</Button>
        <Button variant={"zinc_300"}>zinc_300</Button>
        <Button variant={"zinc_500"}>zinc_500</Button>
        <Button variant={"zinc_700_fill"}>zinc_700_fill</Button>
      </Section>
    </>
  );
};
export default Home;
