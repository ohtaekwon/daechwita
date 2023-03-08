import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { v4 as uuid } from "uuid";

import { createResume, getAllResumes } from "lib/apis/api/resumes";

import Section from "components/section";
import { ResumeCard as Card } from "components/card";
import Text from "_common/components/text";
import Button from "_common/components/button";
import { getResumesService } from "lib/apis/service/getResumes";

type TimeType = {
  seconds: number;
  nanoseconds: number;
};

interface ResumesResponse {
  id: string;
  createdAt: TimeType;
  uid: string;
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

const Resumes = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = React.useState<ResumesResponse[]>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    getAllResumes()
      .then(getResumesService)
      .then((res) => setResumes(res));
  }, [, toggle]);

  const handleAddClick = async () => {
    await createResume({
      apply: {
        company: "회사를 입력해주세요.",
        department: "부서를 입력해주세요.",
      },
      documents: [
        {
          id: uuid(),
          title: "제목을 입력해주세요.",
          text: "내용을 입력해주세요.",
          tag: "태그를 입력해주세요.",
        },
      ],
      publishing: false,
    });
    await navigate("/write/resume");
  };

  return (
    <>
      <Section
        as="section"
        width="100%"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gridTemplateAreas={`'heading heading heading ' '. . .'`}
        gridTemplateRows="50px"
        paddingBottom={10}
        paddingRight={10}
        paddingLeft={10}
        paddingTop={10}
      >
        <Text
          fontSize="xxxl"
          fontWeight={700}
          textAlign="center"
          style={{ gridArea: "heading", height: "10px", padding: "2rem" }}
        >
          나의 자소서 목록
        </Text>
        <Button width="100%" variant={"zinc_200"} onClick={handleAddClick}>
          <AiOutlinePlusSquare size={80} />
        </Button>
        {resumes.map(
          ({
            id,
            createdAt,
            updatedAt,
            uid,
            resumes,
            tag,
          }: ResumesResponse) => (
            <Card
              key={id}
              id={id}
              uid={uid}
              createdAt={createdAt}
              updatedAt={updatedAt}
              resumes={resumes}
              tag={tag}
              toggle={toggle}
              setToggle={setToggle}
            />
          )
        )}
      </Section>
    </>
  );
};

export default Resumes;
