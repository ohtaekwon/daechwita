import React from "react";
import { FaTrashAlt, FaHashtag } from "react-icons/fa";
import {
  ResumeCardProps,
  ScheduleCardProps,
  TodoCardProps,
} from "./index.types";

import useAutoHeightTextarea from "hooks/auto/useAutoHeightTextarea";
import useTaskDragAndDrop from "hooks/dnd/useTaskDragAndDrop";

import { RiDeleteBin6Line } from "react-icons/ri";
import Box from "_common/components/box";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";
import Text from "_common/components/text";
import Flex from "_common/components/flex";
import Modal from "components/modal";
import Input from "_common/components/input";
import Form from "_common/components/form";
import useInput from "hooks/app/useInput";
import { deleteDocuments } from "lib/apis/api/documents";
import { deleteResume } from "lib/apis/api/resumes";
import {
  getFirebaseTimeToDate,
  getFirstSecondHalf,
  getSortedArray,
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
      variant="blue_200_border"
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
            variant="zinc_700_fill"
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

  console.log("tasks", task);
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
  // const { value: Ctitle, onChange: handleTitleChange } = useInput(title);
  // const { value: Ctext, onChange: handleTextChange } = useInput(text);
  // const { value: Ctag, onChange: handleTagChange } = useInput(tag);

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

  return (
    <>
      <Box
        as="div"
        role="alert"
        variant="gray_200_border"
        position="relative"
        display="flex"
        width="100%"
        height="420px"
        marginTop={20}
        marginBottom={20}
        cursor="pointer"
        gap={20}
        boxShadow={`0 4px 16px 0 rgba(31, 38, 135, 0.37);`}
      >
        <Button
          areaLabel="delete"
          onClick={showModal}
          variant="tdred_400_fill"
          position="absolute"
          top={0}
          right={0}
        >
          <FaTrashAlt color="white" size={25} />
        </Button>
        <Box>
          <Flex direction="column">
            <img
              src={imgUrl}
              alt="이미지가 없습니다."
              style={{
                width: "100%",
                height: "170px",
                backgroundSize: "cover",
              }}
            />
            <Text
              fontSize="xxl"
              fontWeight={900}
              marginLeft={10}
              marginBottom={10}
              marginTop={10}
            >
              {getFirstSecondHalf(firebaseDate)}
            </Text>
            <Flex style={{ margin: ".3rem 0" }}>
              <Text fontSize="lg" fontWeight={700} marginLeft={10}>
                지원 회사 :{" "}
              </Text>
              <Text fontSize="lg">{resumes.apply.company}</Text>
            </Flex>
            <Flex style={{ margin: ".3rem 0" }}>
              <Text fontSize="lg" fontWeight={700} marginLeft={10}>
                지원 부서 :{" "}
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
                height="40px"
                wrap="wrap"
                style={{
                  marginBottom: ".3rem",
                }}
              >
                {getSortedArray(tag).map((item, index) =>
                  !item ? null : index <= 4 ? (
                    <Button
                      key={index}
                      variant="vermillion_400_fill"
                      marginRight={5}
                      marginBottom={5}
                    >
                      <FaHashtag />
                      {item}
                    </Button>
                  ) : null
                )}
                {tag.length > 3 && <Button variant="default">더보기 </Button>}
              </Flex>
            )}
          </Flex>
        </Box>
        {/* <Button variant="default" areaLabel="update" onClick={showModal}>
          수정하기
        </Button> */}
      </Box>

      <Modal
        modalType="delete"
        elementId="deleteModal"
        show={deleteModalShow}
        cancel={cancel}
      >
        <Box
          variant="default"
          width="100%"
          height="500px"
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

      <Modal
        modalType="update"
        elementId="modal"
        show={updateModalShown}
        cancel={cancel}
      >
        <Form width={"100%"} height={"100%"}>
          <Box variant={"default"} display="flex" direction="column">
            {/* <Input
              type="text"
              id="title"
              name="title"
              width="100%"
              value={Ctitle}
              defaultValue={Ctitle}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
            />
            <Input
              type="text"
              id="text"
              name="text"
              value={Ctext}
              defaultValue={Ctext}
              onChange={handleTextChange}
              width="100%"
              placeholder="본문을 입력해주세요"
            />
            <Input
              type="text"
              id="tag"
              name="tag"
              value={Ctag}
              defaultValue={Ctag}
              onChange={handleTagChange}
              width="100%"
              placeholder="tag를 입력해주세요"
            /> */}
          </Box>
        </Form>
      </Modal>
    </>
  );
};
