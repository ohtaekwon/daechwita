import { SchedulesType } from "types/index.types";

/**
 * GET Schedule의 데이터 정제
 *
 */
// export const getSchedulesList = (rowData: SchedulesType[]) => {
//   let newData = rowData.sort((a, b) => a.index - b.index);
//   return newData.map(
//     ({
//       id,
//       uid,
//       column,
//       index,
//       application: { department, company },
//     }: SchedulesType) => {
//       return {
//         id,
//         uid,
//         index,
//         column,
//         department,
//         company,
//       };
//     }
//   );
// };
export const getSchedulesList = (rowData: SchedulesType[]) => {
  const newArray: any = { first: [], second: [], third: [], final: [] };
  let newData = rowData.sort((a, b) => a.index - b.index);
  newData
    .map(
      ({
        id,
        uid,
        column,
        index,
        application: { department, company },
      }: SchedulesType) => {
        return {
          id,
          uid,
          index,
          column,
          department,
          company,
        };
      }
    )
    .map((data) => newArray[data.column].push(data));

  return newArray;
};
