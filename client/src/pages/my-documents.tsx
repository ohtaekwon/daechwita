import React from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";

import useUser from "lib/firebase/useUser";
import { createDocuments, getDocuments } from "lib/apis/api/documents";
import { getDocumentsList } from "lib/apis/service/getDocumentsList";

import Modal from "components/modal";
import Section from "components/section";
import { DocumentCard as Card } from "components/card";

import Text from "_common/components/text";
import Button from "_common/components/button";
import Flex from "_common/components/flex";
import Form from "_common/components/form";
import Input from "_common/components/input";
import useInput from "hooks/app/useInput";
import Box from "_common/components/box";
import { authService } from "lib/firebase/provider";
import { useNavigate } from "react-router-dom";

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

const MyDocuments = ({ leftNav }: { leftNav: React.ReactNode }) => {
  const navigate = useNavigate();

  const [documents, setDocuments] = React.useState([]);
  const [reFetch, setReFetch] = React.useState(false);

  const handleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/add-document");
    // createDocuments({
    //   apply: {
    //     company: "LG",
    //     department: "프론트 엔드",
    //   },
    //   tag: tag,
    //   text: text,
    //   title: title,
    // });
    // toggleModal(false);
    // setReFetch(!reFetch);
  };

  React.useEffect(() => {
    getDocuments()
      .then(getDocumentsList)
      .then((res) => setDocuments(res as any));
  }, []);

  return (
    <>
      <div className="documentPage">
        <Flex as="main">
          {leftNav}
          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            gridTemplateAreas={`'heading heading heading heading ' '. .. . .'`}
            gridTemplateRows="50px%"
            width={100}
            height="100%"
            padding={"1rem"}
          >
            <Text
              fontSize="xxxl"
              fontWeight={700}
              textAlign="center"
              style={{ gridArea: "heading", height: "10px", padding: "2rem" }}
            >
              나의 자소서 목록
            </Text>
            <Button
              width="100%"
              variant={"zinc_200"}
              onClick={() => navigate("/add-document")}
            >
              <AiOutlinePlusSquare size={80} />
            </Button>
            {documents.map(
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
        </Flex>
      </div>
    </>
  );
};

export default MyDocuments;
