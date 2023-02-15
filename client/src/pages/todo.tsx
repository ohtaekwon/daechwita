import React from "react";
import { DndProvider } from "react-dnd";
import Section from "components/section";
import Box from "_common/components/box";
import Flex from "_common/components/flex";
import Text from "_common/components/text";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LocalStorageColumn as Column } from "components/column";
import { ColumnType } from "types/index.types";
import { ColumnColorSchema } from "types/schema.types";

const MyTodo = ({ leftNav }: { leftNav: React.ReactNode }) => {
  return (
    <div className="KanbanPage">
      <Flex as="main">
        {leftNav}
        <Box
          as="main"
          variant="default"
          display="flex"
          direction="column"
          width="100%"
          height="100%"
        >
          <Text fontSize="md" textAlign="center">
            칸반페이지
          </Text>
          <DndProvider backend={HTML5Backend}>
            <Section
              as="section"
              sectionType="grid"
              gridTemplateColumns="repeat(4, 1fr)"
            >
              <Column
                key={`${"todo"}-1`}
                column={ColumnType.TO_DO}
                localStorageKey="todo"
                className={`KanBan__${ColumnType.TO_DO}`}
                columnColorSchema={ColumnColorSchema}
                type="localStorage"
              />
              <Column
                key={`${"todo"}-2`}
                column={ColumnType.IN_PROGRESS}
                localStorageKey="todo"
                className={`KanBan__${ColumnType.IN_PROGRESS}`}
                columnColorSchema={ColumnColorSchema}
                type="localStorage"
              />
              <Column
                key={`${"todo"}-3`}
                column={ColumnType.BLOCKED}
                localStorageKey="todo"
                className={`KanBan__${ColumnType.BLOCKED}`}
                columnColorSchema={ColumnColorSchema}
                type="localStorage"
              />
              <Column
                key={`${"todo"}-4`}
                column={ColumnType.COMPLETED}
                localStorageKey="todo"
                className={`KanBan__${ColumnType.COMPLETED}`}
                columnColorSchema={ColumnColorSchema}
                type="localStorage"
              />
            </Section>
          </DndProvider>
        </Box>
      </Flex>
    </div>
  );
};

export default MyTodo;
