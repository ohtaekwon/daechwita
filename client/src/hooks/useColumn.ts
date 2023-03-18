import { CONNREFUSED } from "dns";
import { updateSchedules } from "lib/apis/api/schedules";
import React from "react";
import { v4 as uuid } from "uuid";

type ColumnType = "first" | "second" | "third" | "final";
enum ScheduleType {
  FIRST_ROUND = "first",
  SECOND_ROUND = "second",
  THIRD_ROUND = "third",
  FINAL = "final",
}

// 칸반... 컬럼 내 카드 컴포넌트의 Drag & Drop할 시에, index값을 변경 후, HTTP PUT 요청
// Update,
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

  const update = React.useCallback((id: string, payload: unknown = {}) => {
    updateSchedules(id, payload);
    // dependency에 무엇을 주어야할지??? ✅ 수정 필요
  }, []);
  return { schedules, setSchedules, add, update };
}
export default useColumn;
