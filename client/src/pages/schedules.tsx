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
import Button from "_common/components/button";

import { v4 as uuid } from "uuid";
import Column from "example/react-dnd/column";
import useColumn from "hooks/useColumn";
import { ScheduleModel } from "types/index.types";

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
  const [schedules, setSchedules] = React.useState({
    first: [],
    second: [],
    third: [],
    final: [],
  });

  React.useEffect(() => {
    getAllSchedules()
      .then(getSchedulesList)
      .then((res) =>
        res.map((res) => {
          setSchedules((allTasks) => {
            return {
              ...allTasks,
              [res.column]: [res],
            };
          });
        })
      );
  }, [, toggle]);

  const handleAdd = (column: ColumnType) => {
    createSchedule({
      column: column,
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

  const add = React.useCallback(
    (column: ColumnType) => {
      setSchedules((allData) => {
        const columnSchedules = allData[column];

        if (columnSchedules.length > 100) {
          console.info("추가할 수 있는 한도량을 초과하였습니다.");
          return allData;
        }
        const newColumn = {
          id: uuid(),
          column: column,
          department: "",
          company: "",
        };
        return { ...allData, [column]: [newColumn, ...columnSchedules] };
      });
    },
    [schedules, setSchedules]
  );

  const update = React.useCallback(
    (
      column: ColumnType,
      id?: ScheduleModel["id"],
      updateSchedule?: Omit<Partial<ScheduleModel>, "id">
    ) => {
      setSchedules((allData) => {
        const columnSchedules = allData[column];

        const newColumn = columnSchedules.map((schedules: any) => schedules);

        return {
          ...allData,
          [column]: columnSchedules.map((schedule: any) =>
            schedule.id === id ? { ...schedule, updateSchedule } : schedule
          ),
        };
      });
    },
    [schedules, setSchedules]
  );

  const _delete = React.useCallback(() => {
    setSchedules((allData) => {
      return {
        ...allData,
      };
    });
  }, [schedules, setSchedules]);

  console.log(schedules);
  return (
    <Section as="section" display="grid" gridTemplateColumns="repeat(4, 1fr)">
      <DndProvider backend={HTML5Backend}>
        <Button variant="primary" onClick={() => add("first")}>
          추가
        </Button>
        <button onClick={() => handleAdd("first")}>포스트</button>
        <Button
          variant={"primary"}
          onClick={() => update("first", "m2UXWuPRKb6yscf273EF")}
        >
          업데이터
        </Button>
      </DndProvider>
    </Section>
  );
};

export default Schedules;

// const Colum = ({ column }: { column: ColumnType })=>{

// }
{
  /* <Column
          key={`${"schedule"}-1`}
          className={`KanBan__${ScheduleType.DOCUMENT_ROUND}`}
          column={ScheduleType.DOCUMENT_ROUND}
          columnColorSchema={ColumnColorSchema}
          type={"firebase"}
        />
        <Column
          key={`${"schedule"}-2`}
          className={`KanBan__${ScheduleType.ONE_ROUND}`}
          column={ScheduleType.ONE_ROUND}
          columnColorSchema={ColumnColorSchema}
          type={"firebase"}
        />
        <Column
          key={`${"schedule"}-3`}
          className={`KanBan__${ScheduleType.TWO_ROUND}`}
          column={ScheduleType.TWO_ROUND}
          columnColorSchema={ColumnColorSchema}
          type={"firebase"}
        />
        <Column
          key={`${"schedule"}-4`}
          className={`KanBan__${ScheduleType.THIRD_ROUND}`}
          column={ScheduleType.THIRD_ROUND}
          columnColorSchema={ColumnColorSchema}
          type={"firebase"}
        /> */
}
