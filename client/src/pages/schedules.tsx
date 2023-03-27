import React from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getAllSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

import Column from "components/column";
import Grid from "_common/components/grid";

import { SchedulesEnum, SchedulesType } from "types/schedule";

const Schedules = () => {
  const { data, isLoading, isError, refetch } = useQuery<SchedulesType>(
    QueryKeys.SCHEDULES,
    () => getAllSchedules().then(getSchedulesList)
  );

  React.useEffect(() => {
    document.body.style.backgroundImage =
      " linear-gradient(to right, #e14fad 0%, #f9d423 100%)";

    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);
  return (
    <Grid
      as="section"
      padding="2rem"
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
    >
      {!isLoading ? (
        <DndProvider backend={HTML5Backend}>
          <Column
            className={`col__${SchedulesEnum.FIRST}`}
            column="first"
            data={data?.first}
            badge
            addBtn
          />
          <Column
            className={`col__${SchedulesEnum.SECOND}`}
            column="second"
            data={data?.second}
            badge
            addBtn
          />
          <Column
            className={`col__${SchedulesEnum.THIRD}`}
            column="third"
            data={data?.third}
            badge
            addBtn
          />
          <Column
            className={`col__${SchedulesEnum.FINAL}`}
            column="final"
            data={data?.final}
            badge
            addBtn
          />
        </DndProvider>
      ) : null}
    </Grid>
  );
};

export default Schedules;
