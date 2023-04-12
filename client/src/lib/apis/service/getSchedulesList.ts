import { SchedulesServiceType } from "types/schedule";

/**
 * GET Schedule의 데이터 정제
 *
 */
export const getSchedulesList = (rowData: SchedulesServiceType[]) => {
  const newArray: any = { first: [], second: [], third: [], final: [] };
  let newData = rowData.sort((a, b) => b.index - a.index);
  newData
    .map(
      ({
        id,
        uid,
        column,
        index,
        application: { department, company },
        createdAt,
      }: SchedulesServiceType) => {
        return {
          id,
          uid,
          index,
          column,
          department,
          company,
          createdAt,
        };
      }
    )
    .map((data) => newArray[data.column].push(data));

  return newArray;
};
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
