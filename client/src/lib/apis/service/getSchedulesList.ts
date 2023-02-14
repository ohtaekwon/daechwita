import { SchedulesType } from "types/index.types";

// 데이터 정제
export const getSchedulesList = (rowData: SchedulesType[] | any) => {
  return rowData.map(
    ({
      id,
      uid,
      column,
      apply: { department, company },
      text,
      title,
      createdAt: { seconds, nanoseconds },
    }: SchedulesType) => {
      return {
        id,
        uid,
        column,
        department,
        company,
        text,
        title,
        seconds,
        nanoseconds,
      };
    }
  );
};
