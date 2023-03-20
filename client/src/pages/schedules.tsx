import React from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getAllSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

import Column from "components/column";
import Section from "components/section";

import { SchedulesType } from "types/schedule";

const Schedules = () => {
  const { data, isLoading, isError } = useQuery<SchedulesType>(
    QueryKeys.SCHEDULES,
    () => getAllSchedules().then(getSchedulesList)
  );

  return (
    <Section as="section" display="grid" gridTemplateColumns="repeat(4, 1fr)">
      <DndProvider backend={HTML5Backend}>
        <Column column="first" data={data?.first} addBtn />
        <Column column="second" data={data?.second} addBtn />
        <Column column="third" data={data?.third} addBtn />
        <Column column="final" data={data?.final} addBtn />
      </DndProvider>
    </Section>
  );
};

export default Schedules;
