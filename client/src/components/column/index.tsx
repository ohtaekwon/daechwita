import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

import useColumnTasks from "hooks/dnd/useColumnTasks";
import useColumnDrop from "hooks/dnd/useColumnDrop";

import Text from "_common/components/text";
import Badge from "_common/components/badge";
import Button from "_common/components/button";
import Box from "_common/components/box";
import { TodoCard as TCard, ScheduleCard as SCard } from "components/card";
import { ColumnType, ScheduleType } from "types/index.types";
import { getSchedules, createSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";
import useColumnManager from "hooks/useColumnManager";
import useUser from "lib/firebase/useUser";

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
    <TCard
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
          variant="gray_200_border"
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
  const { user } = useUser();
  const { tasks } = useColumnManager(column as ScheduleType);
  // const [data, setData] = React.useState([]);

  // React.useEffect(() => {
  //   getSchedules()
  //     .then(getSchedulesList)
  //     .then((res) => setData(res));
  // }, []);
  console.log(tasks);

  const ColumnTasks = tasks.map((task, index) => (
    <SCard key={index} task={task} index={index} />
  ));

  const handleAddSchedule = () => {
    createSchedules({
      apply: {
        company: "SK",
        department: "경영",
      },
      column: "second round",
      text: "임시글",
      title: "임시제목",
      uid: user?.uid,
    });
  };

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
          <Button
            variant="default"
            areaLabel="add-task"
            onClick={handleAddSchedule}
          >
            추가하기
          </Button>
        )}
        <Box
          variant="gray_200_border"
          width="300px"
          height="100%"
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
          // opacity={isOver ? 0.85 : 1}
          backgroundColor="gray_100"
        >
          {ColumnTasks}
        </Box>
      </Styled.Wrapper>
    </>
  );
};
