import React from "react";
import { v4 as uuid } from "uuid";
import { ColumnType, TaskModel } from "types/index.types";

import useTaskCollection from "./useTaskCollection";
import { pickRandomColor, swap } from "utils/helpers";

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks<T>(key: string, column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection(key);
  const columnTasks = tasks[column];

  const addEmptyTask = React.useCallback(() => {
    console.log(`Adding new Empty task to ${column} column`);

    setTasks((allTasks) => {
      // console.log(keyof typeof allTa)
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        console.log("Task가 너무 많습니다.");
        return allTasks;
      }
      //   allTasks: {
      //     Todo: TaskModel[];
      //     "In Progress": TaskModel[];
      //     Blocked: TaskModel[];
      //     Completed: TaskModel[];
      // }
      const newColumnTask = {
        id: uuid(),
        title: `New ${column} tasks`,
        color: pickRandomColor("_500"),
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

  //   handleDrop: (fromColumn: ColumnType, taskId: TaskModel["id"]) => void

  const dropTaskFrom = React.useCallback(
    (from: ColumnType, id: TaskModel["id"]) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        console.log(`Moving task ${movingTask?.id} from ${from} to ${column}`);

        if (!movingTask) return allTasks;

        // 원래의 열(컬럼)에서 작업을 제거하고 대상 열(컬럼)으로 복사
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, column }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks]
  );

  const swapTasks = React.useCallback(
    (i: number, j: number) => {
      console.log(`Swapping task ${i} with ${j} in ${column} column`);

      setTasks((allTasks) => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks]
  );
  return {
    tasks: columnTasks,
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  };
}
export default useColumnTasks;
