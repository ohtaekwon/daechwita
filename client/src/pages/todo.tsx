import React from "react";
import { DndProvider } from "react-dnd";
import Section from "components/section";
import Box from "_common/components/box";
import Flex from "_common/components/flex";
import Text from "_common/components/text";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "components/column";
import { ColumnType } from "types/index.types";
import { ColumnColorSchema } from "types/schema.types";

const MyTodo = ({ leftNav }: { leftNav: React.ReactNode }) => {
  return (
    <div className="KanbanPage">
      <Flex as="main">
        {leftNav}
        <Box
          as="main"
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
                column={ColumnType.TO_DO}
                key="todo"
                className={`KanBan__${ColumnType.TO_DO}`}
                columnColorSchema={ColumnColorSchema}
                type="dd"
              />
              <Column
                column={ColumnType.IN_PROGRESS}
                key="todo"
                className={`KanBan__${ColumnType.IN_PROGRESS}`}
                columnColorSchema={ColumnColorSchema}
                type="dd"
              />
              <Column
                column={ColumnType.BLOCKED}
                key="todo"
                className={`KanBan__${ColumnType.BLOCKED}`}
                columnColorSchema={ColumnColorSchema}
                type="dd"
              />
              <Column
                column={ColumnType.COMPLETED}
                key="todo"
                className={`KanBan__${ColumnType.COMPLETED}`}
                columnColorSchema={ColumnColorSchema}
                type="dd"
              />
            </Section>
          </DndProvider>
        </Box>
      </Flex>
    </div>
  );
};

export default MyTodo;
