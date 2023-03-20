import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

import { QueryKeys } from "queryClient";
import useColumn from "hooks/useColumn";

import Button from "_common/components/button";
import Box from "_common/components/box";

import { ScheduleCard } from "components/card";
import useColumnDrop from "hooks/useColumnDrop";

const Column = ({
  as = "div",
  className,
  addBtn,
  column,
  data: schedules = [],
  children,
  ...rest
}: React.PropsWithChildren<Props>) => {
  const { onCreate, onDelete, onUpdate, onDrop, onSwap } = useColumn(
    QueryKeys.SCHEDULES,
    column
  );

  const { isOver, dropRef } = useColumnDrop(column, onDrop);

  const ColumnSchedules = schedules.map((data, index) => (
    <ScheduleCard
      key={data.index}
      index={index}
      column={column}
      data={data}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onSwap={onSwap}
    />
  ));

  const handleAdd = () => {
    onCreate({
      column: column,
      index: Date.now() + Math.random() * 2,
      company: "회사명을 입력해주세요",
      department: "부서명을 입력해주세요",
    });
  };

  return (
    <>
      <Styled.Wrapper as={as} className={className} {...rest}>
        {addBtn && (
          <Button variant="default" areaLabel="add-task" onClick={handleAdd}>
            추가하기
          </Button>
        )}
        <Box
          ref={dropRef}
          variant="gray_200_border"
          width="300px"
          height="100%"
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
          backgroundColor="gray_100"
          opacity={isOver ? 0.85 : 1}
        >
          {schedules && ColumnSchedules}
        </Box>
      </Styled.Wrapper>
    </>
  );
};
export default Column;
