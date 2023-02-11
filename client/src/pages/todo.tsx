import React from "react";
import { DndProvider } from "react-dnd";
import Column from "example/react-dnd/column";
import { ColumnType } from "example/react-dnd/enums";
import Section from "components/section";
import Box from "_common/components/box";
import Flex from "_common/components/flex";
import Text from "_common/components/text";
import { HTML5Backend } from "react-dnd-html5-backend";

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
              <Column column={ColumnType.TO_DO} />
              <Column column={ColumnType.IN_PROGRESS} />
              <Column column={ColumnType.BLOCKED} />
              <Column column={ColumnType.COMPLETED} />
            </Section>
          </DndProvider>
        </Box>
      </Flex>
    </div>
  );
};

export default MyTodo;
