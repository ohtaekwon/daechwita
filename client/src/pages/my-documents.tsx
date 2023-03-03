import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { v4 as uuid } from "uuid";

import useUser from "lib/firebase/useUser";
import { createResume } from "lib/apis/api/resumes";
import useFetch from "hooks/app/useFetch";

import Section from "components/section";
import { DocumentCard as Card } from "components/card";
import Text from "_common/components/text";
import Button from "_common/components/button";

const MyDocuments = () => {
  const navigate = useNavigate();

  // const { payload: documentsPayload } = useFetch("documents");
  // const { payload: usersPayload } = useFetch("users");

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
    await navigate("/write-resume");
  };

  return (
    <>
      <Section
        as="section"
        width="100vw"
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gridTemplateAreas={`'heading heading heading heading ' '. .  . .'`}
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
        {/* {getDocumentsList(documentsPayload as any).map(
          (
            { id, uid, department, company, tag, text, title }: Document,
            index: number
          ) => (
            <Card
              key={id}
              index={index}
              id={id}
              department={department}
              company={company}
              tag={tag}
              text={text}
              title={title}
            />
          )
        )} */}
      </Section>
    </>
  );
};

export default MyDocuments;
