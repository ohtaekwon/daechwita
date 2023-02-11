import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

import useColumnTasks from "hooks/useColumnTasks";
import useColumnDrop from "hooks/dnd/useColumnDrop";

import Text from "_common/components/text";
import Badge from "_common/components/badge";
import Button from "_common/components/button";
import Box from "_common/components/box";
import Card from "components/card";

export const Column = ({
  as = "div",
  className,
  type,
  column,
  columnColorSchema,
  children,
  ...rest
}: React.PropsWithChildren<Props>) => {
  const {
    tasks,
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  } = useColumnTasks(column);

  const { isOver, dropRef } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Card
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onDelete={deleteTask}
      onUpdate={updateTask}
    />
  ));

  return (
    <>
      <Styled.Wrapper as={as} className={className} {...rest}>
        <Text fontSize="md" letterSpacing="3px">
          {columnColorSchema && (
            <Badge
              className="badge"
              variant={columnColorSchema[column]}
              children={column}
            />
          )}
        </Text>
        {type && (
          <Button variant="default" areaLabel="add-task" onClick={addEmptyTask}>
            추가하기
          </Button>
        )}
        <Box
          ref={dropRef}
          width="300px"
          height="100%"
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
          opacity={isOver ? 0.85 : 1}
          backgroundColor="gray_100"
        >
          {ColumnTasks}
        </Box>
      </Styled.Wrapper>
    </>
  );
};
export default Column;
