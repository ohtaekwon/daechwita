import React from "react";
import { FirebaseColumn as Column } from "components/column";
import Section from "components/section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ScheduleType } from "types/index.types";
import Flex from "_common/components/flex";
import { ColumnColorSchema } from "types/schema.types";
import { getSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

const MySchedule = () => {
  return (
    <Section as="section" display="grid" gridTemplateColumns="repeat(4, 1fr)">
      <DndProvider backend={HTML5Backend}>
        <Column
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
        />
      </DndProvider>
    </Section>
  );
};

export default MySchedule;
