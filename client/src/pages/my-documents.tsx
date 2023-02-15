import React from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Section from "components/section";
import { createDocuments, getDocuments } from "lib/apis/api/documents";
import { getDocumentsList } from "lib/apis/service/getDocumentsList";
import useUser from "lib/firebase/useUser";
import Box from "_common/components/box";
import Button from "_common/components/button";
import Flex from "_common/components/flex";
import { DocumentCard as Card } from "components/card";
import { Form, Link } from "react-router-dom";
import Modal from "components/modal";

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
  const [documents, setDocuments] = React.useState([]);
  const { user } = useUser();
  React.useEffect(() => {
    getDocuments()
      .then(getDocumentsList)
      .then((res) => setDocuments(res as any));
  }, []);

  // 모달 state
  const [modalShown, toggleModal] = React.useState(false);

  const showModal = () => {
    toggleModal(true);
  };

  const cancel = () => {
    console.log("-------클릭---------");
    toggleModal(false);
  };

  const handleAdd = () => {
    createDocuments({
      apply: {
        company: "SK",
        department: "경영",
      },
      tag: "자소서",
      text: "임시글",
      title: "임시제목",
      uid: user?.uid,
    });
  };

  console.log(documents);
  return (
    <>
      <div className="documentPage">
        <Flex as="main">
          {leftNav}

          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(5, 1fr)"
          >
            {/* <Box as="div" variant="gray_200_border" width="100%" height="100%"> */}
            <Button width="100%" onClick={showModal} variant={"zinc_200"}>
              <AiOutlinePlusSquare size={80} />
            </Button>
            {/* </Box> */}
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
      <Modal elementId="modal" show={modalShown} cancel={cancel} />
    </>
  );
};

export default MyDocuments;
