import { SchedulesType } from "types/index.types";

/**
 * GE Schedule의 데이터 정제
 *
 * 수정 예정 ✅
 */

export const getSchedulesList = (rowData: SchedulesType[]) => {
  return rowData.map(
    ({
      id,
      uid,
      column,
      application: { department, company },
    }: // createdAt: { seconds, nanoseconds },
    SchedulesType) => {
      return {
        id,
        uid,
        column,
        department,
        company,
        // seconds,
        // nanoseconds,
      };
    }
  );
};
