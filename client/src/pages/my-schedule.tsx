import React from "react";
import { authService } from "lib/firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import Button from "_common/components/button";
import useUser from "lib/firebase/useUser";
import Column from "components/column";
import { BadgeType } from "_common/components/badge/index.types";
import Section from "components/section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ColumnType, ScheduleType } from "types/index.types";
import Flex from "_common/components/flex";
import { ColumnColorSchema } from "types/schema.types";

const MySchedule = ({ leftNav }: { leftNav: React.ReactNode }) => {
  const { logout } = useUser();
  const onLogOutClick = () => {
    authService.signOut();
    logout();
  };

  return (
    <div className="mySchedulePage">
      <Flex as="main">
        {leftNav}
        {/* <Button
        variant="zinc_200"
        paddingY={9}
        paddingX={16}
        fontSize="md"
        lineHeight="md"
        color="zinc_400"
        onClick={onLogOutClick}
      >
        로그아웃
      </Button> */}
        <DndProvider backend={HTML5Backend}>
          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(4, 1fr)"
          >
            <Column
              key="schedule"
              className={`KanBan__${ColumnType.TO_DO}`}
              column={ColumnType.TO_DO}
              columnColorSchema={ColumnColorSchema}
              type={"dd"}
            />
            <Column
              key="schedule"
              className={`KanBan__${ColumnType.IN_PROGRESS}`}
              column={ColumnType.IN_PROGRESS}
              columnColorSchema={ColumnColorSchema}
              type={"dd"}
            />
            <Column
              key="schedule"
              className={`KanBan__${ColumnType.BLOCKED}`}
              column={ColumnType.BLOCKED}
              columnColorSchema={ColumnColorSchema}
              type={"dd"}
            />
            <Column
              key="schedule"
              className={`KanBan__${ColumnType.COMPLETED}`}
              column={ColumnType.COMPLETED}
              columnColorSchema={ColumnColorSchema}
              type={"dd"}
            />
          </Section>
        </DndProvider>
      </Flex>
    </div>
  );
};

export default MySchedule;
