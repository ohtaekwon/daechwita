import React from "react";
import { v4 as uuid } from "uuid";
import { ColumnType } from "components/kanban/enums";
import { TaskModel } from "components/kanban/models";
import useLocalStorage from "./useLocalStorage";

function useTaskCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>("tasks", {
    Todo: [
      {
        id: uuid(),
        column: ColumnType.TO_DO,
        title: "Task 1",
        color: "gray_50",
      },
    ],
    "In Progress": [
      {
        id: uuid(),
        column: ColumnType.IN_PROGRESS,
        title: "Taks 2",
        color: "blue_50",
      },
    ],
    Blocked: [
      {
        id: uuid(),
        column: ColumnType.BLOCKED,
        title: "Task 3",
        color: "red_50",
      },
    ],
    Completed: [
      {
        id: uuid(),
        column: ColumnType.COMPLETED,
        title: "Task 4",
        color: "green_50",
      },
    ],
  });
}
export default useTaskCollection;
