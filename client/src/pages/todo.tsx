import React from "react";
import { DndProvider } from "react-dnd";
import Section from "components/section";
import Text from "_common/components/text";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LocalStorageColumn as Column } from "components/column";
import { ColumnType } from "types/index.types";
import { ColumnColorSchema } from "types/schema.types";

const MyTodo = () => {
  return (
    <Section
      width="100%"
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gridTemplateAreas={`'heading heading heading heading ' '. .  . .'`}
      gridTemplateRows="50px"
      padding="1rem"
    >
      <DndProvider backend={HTML5Backend}>
        <Text
          fontSize="lg"
          fontWeight={700}
          textAlign="center"
          style={{ gridArea: "heading", height: "10px" }}
        >
          나의 자소서 목록
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
      </DndProvider>
    </Section>
  );
};

export default MyTodo;
