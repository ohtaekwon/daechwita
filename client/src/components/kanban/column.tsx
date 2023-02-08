import React from "react";
import Badge from "_common/components/badge";
import Box from "_common/components/box";
import Text from "_common/components/text";
import { ColumnType } from "./enums";
import { BadgeType } from "_common/components/badge/index.types";
import Button from "_common/components/button";
import { TaskModel } from "./models";
import Task from "./task";
import useColumnTasks from "hooks/useColumnTasks";

const ColumnColorSchema: Record<ColumnType, BadgeType> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

const mockTasks: TaskModel[] = [
  { id: "1", title: "Task1", column: ColumnType.TO_DO, color: "red_300" },
  { id: "2", title: "Task2", column: ColumnType.TO_DO, color: "blue_300" },
  { id: "3", title: "Task3", column: ColumnType.TO_DO, color: "green_300" },
];

const Column = ({ column }: { column: ColumnType }) => {
  const { tasks, addEmptyTask, updateTask, deleteTask } =
    useColumnTasks(column);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDelete={deleteTask}
      onUpdate={updateTask}
    />
  ));

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
        width="100%"
        height="100%"
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {ColumnTasks}
      </Box>
    </Box>
  );
};
export default Column;
