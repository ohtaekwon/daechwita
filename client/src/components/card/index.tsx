import React from "react";
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
  createdAt,
  updatedAt,
  resumes,
  tag,
}: React.PropsWithChildren<ResumeCardProps>) => {
  // const { value: Ctitle, onChange: handleTitleChange } = useInput(title);
  // const { value: Ctext, onChange: handleTextChange } = useInput(text);
  // const { value: Ctag, onChange: handleTagChange } = useInput(tag);

  // 모달 state
  const [modalShown, toggleModal] = React.useState(false);

  const showModal = () => {
    toggleModal(true);
  };

  const cancel = () => {
    toggleModal(false);
  };

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await deleteDocuments(id);
  };

  console.log(tag);
  return (
    <>
      <Box
        as="div"
        role="alert"
        variant="gray_200_border"
        position="relative"
        display="flex"
        width="100%"
        height="250px"
        marginTop={20}
        marginBottom={20}
        cursor="grab"
        gap={10}
      >
        <Flex direction="column">
          {/* <Text>{title}</Text>
          <Text>{tag}</Text>
          <Text>{company}</Text> */}
          {tag.map((item, index) =>
            item !== undefined ? <Text key={index}>{item}</Text> : null
          )}
        </Flex>
        <button onClick={showModal}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
      </Box>

      <Modal elementId="modal" show={modalShown} cancel={cancel}>
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
