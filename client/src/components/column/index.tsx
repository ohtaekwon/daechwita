import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

import useColumnTasks from "hooks/dnd/useColumnTasks";
import useColumnDrop from "hooks/dnd/useColumnDrop";

import Text from "_common/components/text";
import Badge from "_common/components/badge";
import Button from "_common/components/button";
import Box from "_common/components/box";
import Card from "components/card";
import { ColumnType } from "types/index.types";
import { getSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

export const LocalStorageColumn = ({
  as = "div",
  localStorageKey,
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
  } = useColumnTasks(localStorageKey, column as ColumnType);

  const { isOver, dropRef } = useColumnDrop(column as ColumnType, dropTaskFrom);

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

export const FirebaseColumn = ({
  as = "div",
  localStorageKey,
  className,
  type,
  column,
  columnColorSchema,
  children,
  ...rest
}: React.PropsWithChildren<Props>) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getSchedules()
      .then(getSchedulesList)
      .then((res) => setData(res));
  }, []);
  console.log(data);

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
          <Button variant="default" areaLabel="add-task">
            추가하기
          </Button>
        )}
        <Box
          width="300px"
          height="100%"
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
          // opacity={isOver ? 0.85 : 1}
          backgroundColor="gray_100"
        >
          {/* {ColumnTasks} */}
        </Box>
      </Styled.Wrapper>
    </>
  );
};
