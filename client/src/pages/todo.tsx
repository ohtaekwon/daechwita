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

    // <Section
    // as="section"
    // width="100%"
    // height="100%"
    // display="grid"
    // gridTemplateColumns="repeat(5, 1fr)"
    // paddingBottom={10}
    // paddingRight={10}
    // paddingLeft={10}
    // paddingTop={10}
    // >
    // <Button variant={"default"}>default</Button>
    // <Button variant={"blackText_1_fill"}>blackText_1_fill</Button>
    // <Button variant={"primary"}>primary</Button>
    // <Button variant={"skyblue_100"}>skyblue_100</Button>
    // <Button variant={"skyblue_300_fill"}>skyblue_300_fill</Button>
    // <Button variant={"skyblue_400"}>skyblue_400</Button>
    // <Button variant={"skyblue_400_fill"}>skyblue_400_fill</Button>
    // <Button variant={"skyblue_500_fill"}>skyblue_500_fill</Button>
    // <Button variant={"tdblue_300_fill"}>tdblue_300_fill</Button>
    // <Button variant={"vermillion_400_fill"}>vermillion_400_fill</Button>
    // <Button variant={"tdred_100"}>tdred_100</Button>
    // <Button variant={"tdred_400"}>tdred_400</Button>
    // <Button variant={"tdred_400_fill"}>tdred_400_fill</Button>
    // <Button variant={"zinc_200"}>zinc_200</Button>
    // <Button variant={"zinc_200_filled"}>zinc_200_filled</Button>
    // <Button variant={"zinc_200_reverse"}>zinc_200_reverse</Button>
    // <Button variant={"zinc_300"}>zinc_300</Button>
    // <Button variant={"zinc_500"}>zinc_500</Button>
    // <Button variant={"zinc_700_fill"}>zinc_700_fill</Button>
    // </Section>
  );
};

export default MyTodo;
