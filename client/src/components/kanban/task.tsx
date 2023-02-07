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
      width="200px"
      backgroundColor={task.color}
      cursor="grab"
    >
      <Button
        variant="default"
        position="absolute"
        zIndex={100}
        areaLabel="delete"
      >
        <RiDeleteBin6Line />
      </Button>
      <textarea>asdsad</textarea>
    </Box>
  );
};
export default Task;
