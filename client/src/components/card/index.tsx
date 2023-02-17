import React from "react";
import {
  DocumentCardProps,
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
      variant="default"
      role="group"
      position="relative"
      display="flex"
      width="200px"
      height="120px"
      marginTop={20}
      marginBottom={20}
      backgroundColor={task.color}
      cursor="grab"
      opacity={isDragging ? 0.5 : 1}
    >
      <Button
        aria-label="delete-task"
        variant="default"
        position="absolute"
        zIndex={100}
        areaLabel="delete"
        top={0}
        right={0}
        onClick={handleDeleteClick}
      >
        <RiDeleteBin6Line />
      </Button>
      <Textarea
        width="150px"
        height={lineHeight * 27 + 90}
        margin="auto"
        textAlign="center"
        ref={textAreaRef}
        value={task.title}
        onChange={handleChange}
        onKeyDown={checkItemEnterHandler}
      >
        {task.title}
      </Textarea>
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

export const DocumentCard = ({
  index,
  department,
  company,
  tag,
  text,
  title,
  id,
}: React.PropsWithChildren<DocumentCardProps>) => {
  return (
    <Box
      as="div"
      role="alert"
      variant="gray_200_border"
      position="relative"
      display="flex"
      width="100%"
      height="120px"
      marginTop={20}
      marginBottom={20}
      cursor="grab"
    >
      <Text>{title}</Text>
    </Box>
  );
};
