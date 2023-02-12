import React from "react";
import { v4 as uuid } from "uuid";

import { ColumnType, ScheduleType, TaskModel } from "types/index.types";
import useLocalStorage from "hooks/app/useLocalStorage";

function useTaskCollection(key: string) {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>(key, {
    [ColumnType.TO_DO]: [
      {
        id: uuid(),
        column: ColumnType.TO_DO,
        title: "글을 입력 해주세요",
        color: "gray_200",
      },
    ],
    [ColumnType.IN_PROGRESS]: [
      {
        id: uuid(),
        column: ColumnType.IN_PROGRESS,
        title: "글을 입력 해주세요",
        color: "blue_200",
      },
    ],
    [ColumnType.BLOCKED]: [
      {
        id: uuid(),
        column: ColumnType.BLOCKED,
        title: "글을 입력 해주세요",
        color: "red_200",
      },
    ],
    [ColumnType.COMPLETED]: [
      {
        id: uuid(),
        column: ColumnType.COMPLETED,
        title: "글을 입력 해주세요",
        color: "green_200",
      },
    ],
  });
}

export default useTaskCollection;

// return useLocalStorage<{
//   [key in ScheduleType]: TaskModel[];
// }>(key, {
//   [ScheduleType.DOCUMENT_ROUND]: [
//     {
//       id: uuid(),
//       column: ScheduleType.DOCUMENT_ROUND,
//       title: "글을 입력 해주세요",
//       color: "gray_200",
//     },
//   ],
//   [ScheduleType.ONE_ROUND]: [
//     {
//       id: uuid(),
//       column: ScheduleType.ONE_ROUND,
//       title: "글을 입력 해주세요",
//       color: "blue_200",
//     },
//   ],
//  [ScheduleType.TWO_ROUND]: [
//     {
//       id: uuid(),
//       column: ScheduleType.TWO_ROUND,
//       title: "글을 입력 해주세요",
//       color: "red_200",
//     },
//   ],
//   [ScheduleType.THIRD_ROUND]: [
//     {
//       id: uuid(),
//       column: ColumnType.COMPLETED,
//       title: "글을 입력 해주세요",
//       color: "green_200",
//     },
//   ],
// });
