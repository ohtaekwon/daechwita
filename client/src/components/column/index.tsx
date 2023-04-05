/** @jsxImportSource @emotion/react */
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

import { QueryKeys } from "queryClient";
import useColumn from "hooks/dnd/useColumn";

import Button from "_common/components/Button";
import Box from "_common/components/Box";

import { ScheduleCard } from "components/Card";
import useColumnDrop from "hooks/dnd/useColumnDrop";
import { emoji } from "utils/constants";
import { css } from "@emotion/react";

const Column = ({
  className,
  badge,
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
      key={data.id}
      index={data.index}
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
      company: "",
      department: "",
    });
  };

  return (
    <>
      <Styled.Wrapper className={className}>
        {addBtn && (
          <Box padding="1rem">
            <Button
              areaLabel="add-task"
              onClick={handleAdd}
              variant="tdred_400_fill"
              width="100%"
              height="100%"
              fontSize="xl"
              fontWeight={500}
            >
              <AiOutlinePlus size={25} color="#eaeaea" />
              {emoji[column]} 추가하기
            </Button>
          </Box>
        )}
        <Box
          ref={dropRef}
          variant="gray_200_border"
          width="100%"
          height="100vh"
          display="flex"
          direction="column"
          margin="auto"
          alignItems="center"
          opacity={isOver ? 0.85 : 1}
          css={css`
            overflow-y: scroll;
          `}
        >
          {schedules && ColumnSchedules}
        </Box>
      </Styled.Wrapper>
    </>
  );
};
export default Column;
