import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaHashtag } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImTree } from "react-icons/im";
import { FaBuilding } from "react-icons/fa";
import {
  ResumeCardProps,
  ScheduleCardProps,
  TodoCardProps,
} from "./index.types";

import * as Styled from "./index.styles";
import { deleteResume } from "lib/apis/api/resumes";

import useAutoHeightTextarea from "hooks/auto/useAutoHeightTextarea";
import useTaskDragAndDrop from "hooks/dnd/useTaskDragAndDrop";

import Box from "_common/components/box";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";
import Text from "_common/components/text";
import Flex from "_common/components/flex";
import Modal from "components/modal";

import {
  getFirebaseTimeToDate,
  getFirstSecondHalf,
  getSortedArray,
  randomButtonColor,
} from "utils/helpers";

export const TodoCard = ({
  index,
  task,
  onDelete: handleDelete,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  children,
}: React.PropsWithChildren<TodoCardProps>) => {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLElement>(
    { task, index: index },
    handleDropHover
  );

  /**
   * text area의 자동 크기 조절 기능을 담당
   */
  const {
    textAreaRef,
    lineHeight,
    checkItemChangeHandler,
    checkItemEnterHandler,
  } = useAutoHeightTextarea();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
    checkItemChangeHandler(e);
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      ref={ref}
      as="div"
      variant="gray_200_border"
      role="group"
      position="relative"
      display="flex"
      width="300px"
      height="auto"
      marginTop={20}
      marginBottom={20}
      backgroundColor={task.color}
      cursor="grab"
      opacity={isDragging ? 0.5 : 1}
    >
      <Flex direction="column" width="100%">
        <Box>
          <Button
            aria-label="delete-task"
            variant="tdred_400_fill"
            position="absolute"
            top={0}
            right={0}
            zIndex={100}
            areaLabel="delete"
            onClick={handleDeleteClick}
          >
            <RiDeleteBin6Line />
          </Button>
        </Box>
        <Textarea
          width="100%"
          height={lineHeight * 27 + 150}
          margin="auto"
          textAlign="center"
          paddingBottom={10}
          paddingLeft={10}
          paddingRight={10}
          paddingTop={30}
          fontSize="xxl"
          ref={textAreaRef}
          value={task.title}
          onChange={handleChange}
          onKeyDown={checkItemEnterHandler}
        >
          {task.title}
        </Textarea>
      </Flex>
    </Box>
  );
};

export const ScheduleCard = ({
  index,
  task,
  children,
}: React.PropsWithChildren<ScheduleCardProps>) => {
  /**
   * text area의 자동 크기 조절 기능을 담당
   */
  const {
    textAreaRef,
    lineHeight,
    checkItemChangeHandler,
    checkItemEnterHandler,
  } = useAutoHeightTextarea();

  return (
    <Box
      as="div"
      role="group"
      variant="default"
      position="relative"
      display="flex"
      width="200px"
      height="120px"
      marginTop={20}
      marginBottom={20}
      cursor="grab"
    >
      <Button
        aria-label="delete-task"
        variant="default"
        position="absolute"
        zIndex={100}
        areaLabel="delete"
        top={0}
        right={0}
      >
        <RiDeleteBin6Line />
      </Button>
      <Textarea
        width="150px"
        height={lineHeight * 27 + 90}
        margin="auto"
        textAlign="center"
        value={task.text}
        ref={textAreaRef}
        onKeyDown={checkItemEnterHandler}
      >
        {task.text}
      </Textarea>
    </Box>
  );
};

export const ResumeCard = ({
  id,
  uid,
  imgUrl,
  createdAt,
  updatedAt,
  resumes,
  tag,
  toggle,
  setToggle,
}: React.PropsWithChildren<ResumeCardProps>) => {
  const navigate = useNavigate();

  const [frontToBack, setFrontToBack] = React.useState<boolean>(false);

  /**
   * 모달 state
   */
  const firebaseDate = new Date(createdAt.seconds * 1000);
  const updateDate = updatedAt ? new Date(updatedAt.seconds * 1000) : null;
  const [updateModalShown, toggleUpdateModal] = React.useState(false);
  const [deleteModalShow, toggleDeleteModal] = React.useState(false);

  const showModal = (e: React.SyntheticEvent) => {
    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "update") {
      toggleUpdateModal(true);
    } else {
      toggleDeleteModal(true);
    }
  };

  const cancel = (e: React.SyntheticEvent) => {
    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "updateCancel") {
      toggleUpdateModal(false);
    } else {
      toggleDeleteModal(false);
    }
  };

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await deleteResume(id);
    setToggle(!toggle);
  };

  const handleUpdateButtonClick = () => {
    navigate(`write/${id}`);
  };

  return (
    <>
      <Styled.Wrapper as="div" onMouseLeave={() => setFrontToBack(false)}>
        {/* 앞 면 */}
        <Box
          variant={frontToBack ? "front" : "gray_200_border"}
          width="100%"
          height="420px"
          zIndex={10}
          position="absolute"
        >
          <div style={{ position: "absolute", top: 0, right: 0 }}>
            <Button areaLabel="update" onClick={showModal} variant="primary">
              <AiOutlineSearch color="white" />
            </Button>
            <Button
              areaLabel="delete"
              onClick={showModal}
              variant="tdred_400_fill"
            >
              <FaTrashAlt color="white" />
            </Button>
          </div>

          <Flex direction="column">
            <img
              src={imgUrl}
              alt="이미지가 없습니다."
              loading="lazy"
              style={{
                width: "100%",
                height: "170px",
                backgroundSize: "cover",
              }}
            />
            <Text
              fontSize="xxl"
              fontWeight={900}
              paddingTop={10}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
            >
              {getFirstSecondHalf(firebaseDate)}
            </Text>
            <Flex style={{ margin: ".3rem 0" }}>
              <Text
                fontSize="lg"
                fontWeight={700}
                marginLeft={10}
                marginRight={10}
              >
                지원 회사 :
              </Text>
              <Text fontSize="lg">{resumes.apply.company}</Text>
            </Flex>
            <Flex style={{ margin: ".3rem 0" }}>
              <Text
                fontSize="lg"
                fontWeight={700}
                marginLeft={10}
                marginRight={10}
              >
                지원 부서 :
              </Text>
              <Text fontSize="lg" marginBottom={5}>
                {resumes.apply.department}
              </Text>
            </Flex>
            <Flex direction="column" style={{ margin: ".3rem 0" }}>
              <Text
                fontSize="md"
                fontWeight={500}
                marginLeft={10}
                marginBottom={5}
              >
                생성일 : {getFirebaseTimeToDate(firebaseDate)}
              </Text>
              <Text
                fontSize="md"
                fontWeight={500}
                marginLeft={10}
                marginBottom={5}
              >
                수정일 : {getFirebaseTimeToDate(updateDate)}
              </Text>
            </Flex>

            {tag[0] !== "" && (
              <Flex
                width="100%"
                height="100%"
                wrap="wrap"
                style={{
                  padding: ".5rem",
                }}
              >
                {getSortedArray(tag).map((item, index) =>
                  !item ? null : index < 5 ? (
                    <Button
                      key={`${tag}-${index}`}
                      variant={randomButtonColor()}
                      marginRight={5}
                      marginBottom={5}
                    >
                      <FaHashtag />
                      {item}
                    </Button>
                  ) : null
                )}
                {tag.length > 5 && (
                  <Button
                    variant="default"
                    onClick={() => setFrontToBack(true)}
                  >
                    더보기
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </Box>
        {/* 뒷 면 */}
        <Box
          variant="back"
          zIndex={5}
          position="absolute"
          width="100%"
          height="420px"
        >
          <img
            src={process.env.PUBLIC_URL + "images/resume_alt_01.jpg"}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 6,
              opacity: 0.6,
            }}
          />
          <Flex
            width="100%"
            height="100%"
            backgroundColor="transparent"
            direction="column"
            justifyContent="center"
            alignItems="center"
            wrap="wrap"
            style={{
              zIndex: 7,
              position: "absolute",
              margin: "auto",
              padding: "1rem",
            }}
          >
            {tag.map((item, index) => (
              <Button
                key={`${item}-${index}`}
                variant={randomButtonColor()}
                radius={15}
                marginTop={5}
                marginBottom={5}
              >
                <FaHashtag />
                {item}
              </Button>
            ))}
          </Flex>
        </Box>
      </Styled.Wrapper>
      {/* 삭제하기 버튼 모달창 */}
      <Modal
        modalType="delete"
        elementId="deleteModal"
        width="500px"
        height="300px"
        show={deleteModalShow}
        cancel={cancel}
      >
        <Box
          variant="default"
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize="xxxl"
            fontWeight={700}
            textAlign="center"
            marginTop={50}
            marginBottom={50}
            style={{ gridArea: "heading", height: "10px", padding: "2rem" }}
          >
            정말 삭제하시겠습니까?
          </Text>
          <Flex>
            <Button
              onClick={handleDelete}
              variant="tdred_400_fill"
              width="200px"
              height="70px"
            >
              삭제
            </Button>
            <Button
              onClick={cancel}
              variant="tdred_100"
              width="200px"
              height="70px"
            >
              취소
            </Button>
          </Flex>
        </Box>
      </Modal>
      {/* 자세히 보기 버튼 모달창 */}
      <Modal
        modalType="update"
        elementId="modal"
        width="50%"
        height="90%"
        show={updateModalShown}
        cancel={cancel}
      >
        <Box
          display="flex"
          direction="column"
          padding="1rem"
          width="100%"
          height="100%"
        >
          <Flex
            width="100%"
            justifyContent="space-around"
            style={{
              borderBottom: "1px solid #000",
              padding: "1rem 0",
            }}
          >
            <Text
              fontSize="xxl"
              fontWeight={700}
              paddingTop={10}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              marginRight={10}
              whiteSpace="nowrap"
            >
              <FaBuilding size={30} /> 회사 : {resumes.apply.company}
            </Text>
            <Text
              fontSize="xxl"
              fontWeight={700}
              paddingTop={10}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              whiteSpace="nowrap"
            >
              <ImTree size={30} /> 부서 : {resumes.apply.department}
            </Text>
          </Flex>
          {resumes.documents.map((doc, index) => (
            <Flex key={index} direction="column" style={{ marginTop: "1rem" }}>
              <Text
                fontSize="xl"
                fontWeight={700}
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                whiteSpace="nowrap"
              >
                유 형 : {doc.tag}
              </Text>
              <Text
                fontSize="xl"
                fontWeight={700}
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                whiteSpace="nowrap"
              >
                제 목 : {doc.title}
              </Text>
              <Text
                fontSize="xl"
                lineHeight="xl"
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
              >
                {doc.text}
              </Text>
            </Flex>
          ))}
          <Box
            width="100%"
            height="auto"
            position="sticky"
            marginTop={400}
            bottom={0}
            left={0}
            right={0}
          >
            <Button
              width="100%"
              onClick={handleUpdateButtonClick}
              variant="tdred_400_fill"
              fontSize="xxl"
              radius={8}
              height="50px"
            >
              자세히 보기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
