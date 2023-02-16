import React from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";

import useUser from "lib/firebase/useUser";
import { createDocuments, getDocuments } from "lib/apis/api/documents";
import { getDocumentsList } from "lib/apis/service/getDocumentsList";

import Modal from "components/modal";
import Section from "components/section";
import { DocumentCard as Card } from "components/card";

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

  const [title, handleTitleChange] = useInput("");
  const [text, handleTextChange] = useInput("");
  const [tag, handleTagChange] = useInput("");

  const [documents, setDocuments] = React.useState([]);
  const [reFetch, setReFetch] = React.useState(false);

  // 모달 state
  const [modalShown, toggleModal] = React.useState(false);

  const showModal = () => {
    toggleModal(true);
  };

  const cancel = () => {
    console.log("-------클릭---------");
    toggleModal(false);
  };

  const handleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();

    createDocuments({
      apply: {
        company: "LG",
        department: "프론트 엔드",
      },
      tag: tag,
      text: text,
      title: title,
    });
    toggleModal(false);
    setReFetch(!reFetch);
  };

  React.useEffect(() => {
    getDocuments()
      .then(getDocumentsList)
      .then((res) => setDocuments(res as any));

    console.log(documents);
  }, [reFetch]);

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
            <button onClick={() => navigate("/add-document")}> 이동</button>
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
      <Modal elementId="modal" show={modalShown} cancel={cancel}>
        <Form width={"100%"} height={"100%"} onSubmit={handleAdd}>
          <Box variant={"default"} display="flex" direction="column">
            <Input
              type="title"
              id="title"
              name="title"
              width="100%"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
            />
            <Input
              type="text"
              id="text"
              name="text"
              value={text}
              onChange={handleTextChange}
              width="100%"
              placeholder="본문을 입력해주세요"
            />
            <Input
              type="text"
              id="tag"
              name="tag"
              value={tag}
              onChange={handleTagChange}
              width="100%"
              placeholder="tag를 입력해주세요"
            />

            <select name="order" form="myForm">
              <option value="americano">아메리카노</option>
              <option value="caffe latte">카페라테</option>
              <option value="cafe au lait">카페오레</option>
              <option value="espresso">에스프레소</option>
            </select>
          </Box>
        </Form>
      </Modal>
    </>
  );
};

export default MyDocuments;
