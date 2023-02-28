import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { getDocuments } from "lib/apis/api/documents";
import { getDocumentsList } from "lib/apis/service/getDocumentsList";

import Section from "components/section";
import { DocumentCard as Card } from "components/card";

import Text from "_common/components/text";
import Button from "_common/components/button";
import useFetch from "hooks/app/useFetch";
import { createApplications } from "lib/apis/api/applications";
import useUser from "lib/firebase/useUser";
import { authInstance } from "lib/apis/utils/instance";

type Document = {
  id: string;
  uid: string;
  department: string;
  company: string;
  text: string;
  title: string;
  seconds: number;
  nanoseconds: number;
  tag: string;
};

const MyDocuments = () => {
  const { user } = useUser();

  const navigate = useNavigate();
  const { payload: documentsPayload } = useFetch("documents");
  const { payload: usersPayload } = useFetch("users");
  const [userData, setUserData] = React.useState<any>([]);

  const handleAddClick = async () => {
    navigate(`/add/${(usersPayload[0] as any).numberOfPublishing + 1}`);
    await createApplications({ id: user?.uid });
  };

  const handleUser = async () => {
    const { data } = await authInstance.get("/users");
    console.log(data[0]);
  };
  // // console.log(user?.uid);

  // const handleUpdate = async () => {
  //   await authInstance.put(`users/${user?.uid}`, {
  //     numberOfPublishing: 2,
  //   });
  // };
  React.useEffect(() => {
    handleUser();
  }, []);

  React.useEffect(() => {
    setUserData(usersPayload[0]);
  });
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
        {getDocumentsList(documentsPayload as any).map(
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
        )}
      </Section>
    </>
  );
};

export default MyDocuments;
