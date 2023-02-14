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

const MySchedule = ({ leftNav }: { leftNav: React.ReactNode }) => {
  return (
    <div className="mySchedulePage">
      <Flex as="main">
        {leftNav}

        <DndProvider backend={HTML5Backend}>
          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(4, 1fr)"
          >
            <Column
              key={`${"schedule"}-1`}
              localStorageKey="schedule"
              className={`KanBan__${ScheduleType.DOCUMENT_ROUND}`}
              column={ScheduleType.DOCUMENT_ROUND}
              columnColorSchema={ColumnColorSchema}
              type={"firebase"}
            />
            <Column
              key={`${"schedule"}-2`}
              localStorageKey="schedule"
              className={`KanBan__${ScheduleType.ONE_ROUND}`}
              column={ScheduleType.ONE_ROUND}
              columnColorSchema={ColumnColorSchema}
              type={"firebase"}
            />
            <Column
              key={`${"schedule"}-3`}
              localStorageKey="schedule"
              className={`KanBan__${ScheduleType.TWO_ROUND}`}
              column={ScheduleType.TWO_ROUND}
              columnColorSchema={ColumnColorSchema}
              type={"firebase"}
            />
            <Column
              key={`${"schedule"}-4`}
              localStorageKey="schedule"
              className={`KanBan__${ScheduleType.THIRD_ROUND}`}
              column={ScheduleType.THIRD_ROUND}
              columnColorSchema={ColumnColorSchema}
              type={"firebase"}
            />
          </Section>
        </DndProvider>
      </Flex>
    </div>
  );
};

export default MySchedule;
