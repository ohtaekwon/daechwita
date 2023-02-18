import React from "react";
import { DndProvider } from "react-dnd";
import Section from "components/section";
import Text from "_common/components/text";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LocalStorageColumn as Column } from "components/column";
import { ColumnType } from "types/index.types";
import { ColumnColorSchema } from "types/schema.types";

const MyTodo = ({ leftNav }: { leftNav: React.ReactNode }) => {
  return (
    <div className="KanbanPage" style={{ height: "100%", display: "flex" }}>
      {leftNav}

      <DndProvider backend={HTML5Backend}>
        <Section
          as="section"
          sectionType="grid"
          gridTemplateAreas={`'heading heading heading heading' '. . . .'`}
          gridTemplateColumns="repeat(4, 1fr)"
          gridTemplateRows="20px"
          width={100}
          height="100vh"
          // backgroundColor="gray_100"
          padding={"1rem"}
        >
          <Text
            fontSize="lg"
            fontWeight={700}
            textAlign="center"
            style={{ gridArea: "heading", height: "10px" }}
          >
            오늘의 할일
          </Text>
          <Column
            // key={`${ColumnType.TO_DO}-1`}
            column={ColumnType.TO_DO}
            localStorageKey="todayTodo"
            className={`KanBan__${ColumnType.TO_DO}`}
            columnColorSchema={ColumnColorSchema}
            type="localStorage"
          />
          <Column
            // key={`${ColumnType.IN_PROGRESS}-2`}
            column={ColumnType.IN_PROGRESS}
            localStorageKey="todayTodo"
            className={`KanBan__${ColumnType.IN_PROGRESS}`}
            columnColorSchema={ColumnColorSchema}
            type="localStorage"
          />
          <Column
            // key={`${ColumnType.BLOCKED}-3`}
            column={ColumnType.BLOCKED}
            localStorageKey="todayTodo"
            className={`KanBan__${ColumnType.BLOCKED}`}
            columnColorSchema={ColumnColorSchema}
            type="localStorage"
          />
          <Column
            // key={`${ColumnType.COMPLETED}-4`}
            column={ColumnType.COMPLETED}
            localStorageKey="todayTodo"
            className={`KanBan__${ColumnType.COMPLETED}`}
            columnColorSchema={ColumnColorSchema}
            type="localStorage"
          />
        </Section>
      </DndProvider>
    </div>
  );
};

export default MyTodo;
