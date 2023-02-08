import React from "react";
import { v4 as uuid } from "uuid";
import { ColumnType } from "components/kanban/enums";
import { TaskModel } from "components/kanban/models";
import useTaskCollection from "./useTaskCollection";
import pickRandomColor from "utils/helpers";

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const addEmptyTask = React.useCallback(() => {
    console.log(`Adding new Empty task to ${column} column`);

    setTasks((allTasks) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        console.log("Task가 너무 많습니다.");
        return allTasks;
      }

      const newColumnTask: TaskModel = {
        id: uuid(),
        title: `New ${column} tasks`,
        color: pickRandomColor("_300"),
        column,
      };

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const updateTask = React.useCallback(
    (id: TaskModel["id"], updatedTask: Omit<Partial<TaskModel>, "id">) => {
      console.log(`Updating task ${id} with ${JSON.stringify(updatedTask)}`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        };
      });
    },
    [column, setTasks]
  );

  const deleteTask = React.useCallback(
    (id: TaskModel["id"]) => {
      console.log(`Removing task ${id}...`);

      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks]
  );

  return {
    tasks: tasks[column],
    addEmptyTask,
    updateTask,
    deleteTask,
  };
}
export default useColumnTasks;
