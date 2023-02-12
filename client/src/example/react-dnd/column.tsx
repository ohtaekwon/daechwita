import React from "react";
import Badge from "_common/components/badge";
import Box from "_common/components/box";
import Text from "_common/components/text";
import { ColumnType } from "./enums";
import { BadgeType } from "_common/components/badge/index.types";
import Button from "_common/components/button";
import { TaskModel } from "./models";
import Task from "./task";
import useColumnTasks from "hooks/dnd/useColumnTasks";
import useColumnDrop from "hooks/dnd/useColumnDrop";
import useMouseMove from "hooks/app/useMouseMove";

const ColumnColorSchema: Record<ColumnType, BadgeType> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

const Column = ({ column }: { column: ColumnType }) => {
  const {
    tasks,
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  } = useColumnTasks("todo", column);
  const { isOver, dropRef } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onDelete={deleteTask}
      onUpdate={updateTask}
    />
  ));

  const coords = useMouseMove();

  console.log(coords);
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="md" letterSpacing="3px">
        <Badge variant={ColumnColorSchema[column]}>{column}</Badge>
      </Text>
      <Button variant="default" areaLabel="add-task" onClick={addEmptyTask}>
        추가하기
      </Button>
      <Box
        ref={dropRef}
        width="300px"
        height="100%"
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        opacity={isOver ? 0.85 : 1}
        backgroundColor="gray_100"
      >
        {ColumnTasks}
      </Box>
    </Box>
  );
};
export default Column;
