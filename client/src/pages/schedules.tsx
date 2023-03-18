import React from "react";

import Section from "components/section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  createSchedule,
  deleteSchedules,
  getAllSchedules,
  updateSchedules,
} from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

import { ScheduleModel, ScheduleType } from "types/index.types";
import { FirebaseColumn as Column } from "components/column";

// interface ColumnType {
//   first: "first";
//   second: "second";
//   third: "third";
//   final: "final";
// }
// const columList: ColumnType = {
//   first: "first",
//   second: "second",
//   third: "third",
//   final: "final",
// };

type ColumnType = "first" | "second" | "third" | "final";

const Schedules = () => {
  const [toggle, setToggle] = React.useState(false);
  const [data, setData] = React.useState<any>([]);
  const [schedules, setSchedules] = React.useState({
    first: [],
    second: [],
    third: [],
    final: [],
  });

  const handleAdd = (column: ColumnType) => {
    createSchedule({
      column: column,
      index: Date.now() + Math.random() * 2,
      application: {
        company: "",
        department: "",
      },
    });
    setToggle(!toggle);
  };

  const handleUpdate = (id: string, payload: unknown = {}) => {
    updateSchedules(id, payload);
  };

  const handleDelete = (id: string) => {
    deleteSchedules(id);
  };

  React.useEffect(() => {
    getAllSchedules()
      .then(getSchedulesList)
      .then((res) => setData(res));
  }, [, toggle]);

  // console.log(data);

  // React.useEffect(() => {
  //   getAllSchedules()
  //     .then(getSchedulesList)
  //     .then((res) =>
  //       res.map((data) =>
  //         setSchedules((allData) => {
  //           const columnSchedule = allData[data.column];
  //           return {
  //             ...allData,
  //             [data.column]: [...columnSchedule, data],
  //           };
  //         })
  //       )
  //     );
  // }, []);
  // const add = React.useCallback(
  //   (column: ColumnType) => {
  //     setSchedules((allData) => {
  //       const columnSchedules = allData[column];

  //       if (columnSchedules.length > 100) {
  //         console.info("추가할 수 있는 한도량을 초과하였습니다.");
  //         return allData;
  //       }
  //       const newColumn = {
  //         id: uuid(),
  //         column: column,
  //         department: "",
  //         company: "",
  //       };
  //       return { ...allData, [column]: [newColumn, ...columnSchedules] };
  //     });
  //   },
  //   [schedules, setSchedules]
  // );

  // const update = React.useCallback(
  //   (
  //     column: ColumnType,
  //     id?: ScheduleModel["id"],
  //     updateSchedule?: Omit<Partial<ScheduleModel>, "id">
  //   ) => {
  //     setSchedules((allData) => {
  //       const columnSchedules = allData[column];

  //       const newColumn = columnSchedules.map((schedules: any) => schedules);

  //       return {
  //         ...allData,
  //         [column]: columnSchedules.map((schedule: any) =>
  //           schedule.id === id ? { ...schedule, updateSchedule } : schedule
  //         ),
  //       };
  //     });
  //   },
  //   [schedules, setSchedules]
  // );

  // const _delete = React.useCallback(() => {
  //   setSchedules((allData) => {
  //     return {
  //       ...allData,
  //     };
  //   });
  // }, [schedules, setSchedules]);
  // console.log(data);
  return (
    <Section as="section" display="grid" gridTemplateColumns="repeat(4, 1fr)">
      <DndProvider backend={HTML5Backend}>
        <button onClick={() => handleAdd(ScheduleType.FINAL)}>추가</button>
        <Column column={ScheduleType.FIRST} data={data[ScheduleType.FIRST]} />
        <Column column={ScheduleType.SECOND} data={data[ScheduleType.SECOND]} />
        <Column column={ScheduleType.THIRD} data={data[ScheduleType.THIRD]} />
        <Column column={ScheduleType.FINAL} data={data[ScheduleType.FINAL]} />
      </DndProvider>
    </Section>
  );
};

export default Schedules;

// const Column = ({ column, data }: { column: ScheduleType; data: any }) => {
//   console.log(column, data);
//   return <></>;
// };

{
  /* <Column
          key={`${"schedule"}-1`}
          className={`KanBan__${ScheduleType.DOCUMENT_ROUND}`}
          column={ScheduleType.DOCUMENT_ROUND}
          columnColorSchema={ColumnColorSchema}
          type={"firebase"}
        />
 */
}
