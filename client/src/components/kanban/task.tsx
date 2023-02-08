import React from "react";
import Box from "_common/components/box";
import Button from "_common/components/button";
import { TaskModel } from "./models";

import { RiDeleteBin6Line } from "react-icons/ri";
import Column from "./column";
import { ColumnType } from "./enums";
type TaskProps = {
  index: number;
  task: TaskModel;
  onDelete: (id: TaskModel["id"]) => void;
  onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
};
const Task = ({
  index,
  task,
  onDelete: handleDelete,
  onUpdate: handleUpdate,
}: TaskProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      as="div"
      role="group"
      position="relative"
      display="flex"
      width="200px"
      height="70px"
      backgroundColor={task.color}
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
        onClick={handleDeleteClick}
      >
        <RiDeleteBin6Line />
      </Button>
      <textarea
        style={{
          width: "180px",
          height: "30px",
          textAlign: "center",
          margin: "auto",
        }}
        value={task.title}
        onChange={handleChange}
      >
        {task.title}
      </textarea>
    </Box>
  );
};
export default Task;
