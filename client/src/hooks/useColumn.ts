import React from "react";
import { v4 as uuid } from "uuid";

type ColumnType = "first" | "second" | "third" | "final";
enum ScheduleType {
  FIRST_ROUND = "first",
  SECOND_ROUND = "second",
  THIRD_ROUND = "third",
  FINAL = "final",
}
function useColumn(column: ScheduleType) {
  const [schedules, setSchedules] = React.useState({
    first: [],
    second: [],
    third: [],
    final: [],
  });

  const add = React.useCallback(() => {
    setSchedules((allData) => {
      const columnTasks = allData[column];

      if (columnTasks.length > 100) {
        console.info("추가할 수 있는 한도량을 초과하였습니다.");
        return allData;
      }
      const newColumn = {
        id: uuid(),
        column: "first",
        department: "",
        company: "",
      };
      return { ...allData, [column]: [newColumn, ...columnTasks] };
    });
  }, []);

  return { schedules, setSchedules };
}
export default useColumn;
