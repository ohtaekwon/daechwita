/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getAllSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

import Column from "components/Column";
import Grid from "_common/components/Grid";

import { SchedulesEnum, SchedulesType } from "types/schedule";
import { media } from "utils/media";
import Spinner from "components/Spinner";

const Schedules = () => {
  const { data, isLoading, isError } = useQuery<SchedulesType>(
    QueryKeys.SCHEDULES(),
    () => getAllSchedules().then(getSchedulesList)
  );

  React.useEffect(() => {
    document.body.style.backgroundImage =
      " linear-gradient(to right, #e14fad 0%, #f9d423 100%)";

    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  if (isError)
    return (
      <Grid placeItems="center" css={errorStyle}>
        <h1 css={errorTextStyle}> Error - 재접속해주시기 바랍니다.</h1>
      </Grid>
    );
  if (isLoading) return <Spinner individualLoader />;
  return (
    <>
      <Grid
        as="section"
        padding="2rem"
        display="grid"
        placeItems="center"
        gridTemplateColumns="repeat(4, 1fr)"
        css={gridStyle}
      >
        {!isLoading && (
          <DndProvider backend={HTML5Backend}>
            <Column
              className={`col__${SchedulesEnum.FIRST}`}
              column="first"
              data={data?.first}
              badge
              addBtn
            />
            <Column
              className={`col__${SchedulesEnum.SECOND}`}
              column="second"
              data={data?.second}
              badge
              addBtn
            />
            <Column
              className={`col__${SchedulesEnum.THIRD}`}
              column="third"
              data={data?.third}
              badge
              addBtn
            />
            <Column
              className={`col__${SchedulesEnum.FINAL}`}
              column="final"
              data={data?.final}
              badge
              addBtn
            />
          </DndProvider>
        )}
      </Grid>
    </>
  );
};

export default Schedules;

const gridStyle = css`
  padding: 1rem 0;
  width: 100%;

  ${media[0]} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${media[1]} {
    grid-template-columns: repeat(4, 1fr);
  }
  ${media[2]} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const errorStyle = css`
  width: 100%;
  height: 100%;
`;
const errorTextStyle = css`
  font-size: 4rem;
  color: red;
`;
