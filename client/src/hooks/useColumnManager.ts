import { getSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";
import React from "react";
import { ScheduleType } from "types/index.types";

function useColumnManager(column: ScheduleType) {
  const [tasks, setTasks] = React.useState([]);
  const readValue = React.useCallback(() => {
    getSchedules()
      .then(getSchedulesList)
      .then((res) => setTasks(res));
  }, []);

  React.useEffect(() => {
    readValue();
  }, [column]);

  const addEmptyTask = React.useCallback(() => {
    console.log(`Adding new Empty task to ${column} column`);

    // setTasks((allTasks)=>{

    //   return {
    //   ...allTasks,
    //   }
    // })
  }, [column, setTasks]);
  return {
    tasks,
  };
}
export default useColumnManager;

// {
//   [ScheduleType.DOCUMENT_ROUND]: [
//     {
//       id: "1",
//       column: ScheduleType.DOCUMENT_ROUND,
//       title: "글을 입력 해주세요",
//       color: "gray_200",
//     },
//   ],
//   [ScheduleType.ONE_ROUND]: [
//     {
//       id: "2",
//       column: ScheduleType.ONE_ROUND,
//       title: "글을 입력 해주세요",
//       color: "blue_200",
//     },
//   ],
//   [ScheduleType.TWO_ROUND]: [
//     {
//       id: "3",
//       column: ScheduleType.TWO_ROUND,
//       title: "글을 입력 해주세요",
//       color: "red_200",
//     },
//   ],
//   [ScheduleType.THIRD_ROUND]: [
//     {
//       id: "4",
//       column: ScheduleType.THIRD_ROUND,
//       title: "글을 입력 해주세요",
//       color: "green_200",
//     },
//   ],
// },
