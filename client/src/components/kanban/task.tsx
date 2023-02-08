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
};
const Task = ({ index, task }: TaskProps) => {
  return (
    <Box
      as="div"
      role="group"
      position="relative"
      display="flex"
      width="200px"
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
      >
        {task.title}
      </textarea>
    </Box>
  );
};
export default Task;
