import React from "react";
import { Props } from "./index.types";

import useAutoHeightTextarea from "hooks/auto/useAutoHeightTextarea";
import useTaskDragAndDrop from "hooks/useTaskDragAndDrop";

import { RiDeleteBin6Line } from "react-icons/ri";
import Box from "_common/components/box";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";

const Card = ({
  index,
  task,
  onDelete: handleDelete,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  children,
}: React.PropsWithChildren<Props>) => {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLElement>(
    {
      task,
      index,
    },
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
    console.log(e.target.value.length);
    checkItemChangeHandler(e);
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      ref={ref}
      as="div"
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
        onKeyDown={() => checkItemEnterHandler}
      >
        {task.title}
      </Textarea>
    </Box>
  );
};
export default Card;
