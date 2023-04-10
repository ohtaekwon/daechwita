/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";

import {
  getUserResumesAll,
  getUserResumesByCategory,
  getUserSchedulesByCategory,
} from "lib/apis/api/charts";

import Chart from "components/Chart";
import Text from "_common/components/Text";
import Grid from "_common/components/Grid";

import { emoji, scheduleChartDict } from "utils/constants";
import { checkSeries } from "utils/helpers";
import { media } from "utils/media";
import { ColumnType } from "types/schedule";

const MyDataCharts = ({}) => {
  /**
   * @description 차트에서 사용할 TOTAL 데이터의 useQuery
   * Schedules
   * @constant userColumnOfSchedule 전체 이력서 데이터로 schedules의 company 데이터 (bar차트)
   * @constant userDepartmentOfSchedules 전체 입사 지원 현황 데이터로 resumes의 department 데이터 (polarArea차트)
   * Resumes
   * @constant  userTagOfResumes 유저의 자기소개서(Resumes)의 데이터 중 Tag 데이터 (treemap 차트)
   * @constant userAllOfResumes 유저의 자기소개서(Resumes) 데이터 중 완료와 임시글 (donut 차트)
   */
  const {
    data: userColumnOfSchedules,
    isLoading: columnIsLoading,
    error: columnError,
  } = useQuery<{
    data: { column: ColumnType; count: number }[];
  }>(
    QueryKeys.USER_CHART_SCHEDULES_BY_CATEGORY("column"),
    () => getUserSchedulesByCategory("column"),
    { refetchOnMount: "always" }
  );

  const {
    data: userDepartmentOfSchedules,
    isLoading: departmentIsLoading,
    error: departmentError,
  } = useQuery<{
    data: { department: string; count: number }[];
  }>(
    QueryKeys.USER_CHART_SCHEDULES_BY_CATEGORY("department"),
    () => getUserSchedulesByCategory("department"),
    { refetchOnMount: "always" }
  );

  const {
    data: userTagOfResumes,
    isLoading: tagIsLoading,
    error: tagError,
    refetch: userTagOfResumesRefetch,
  } = useQuery<{ data: { tag: string; count: number }[] }>(
    QueryKeys.USER_CHART_RESUMES_BY_CATEGORY("tag"),
    () => getUserResumesByCategory({ category: "tag", publishing: true }),
    {
      enabled: true, // 요청 활성화
      refetchOnMount: "always", // 페이지 마운트시 refetch
    }
  );

  const {
    data: userAllOfResumes,
    isLoading: allIsLoading,
    error: allError,
  } = useQuery<{
    data: {
      isPublishing: number;
      isNotPublishing: number;
    };
  }>(QueryKeys.USER_CHART_ALL_RESUMES(), () => getUserResumesAll(), {
    refetchOnMount: "always",
  });

  /**
   * @description 마이 데이터
   * @constant userSchedulesColumn 유저의 Schedules 데이터중 column 데이터
   * @constant userSchedulesDepartment 유저의 Schedules 데이터중 department 데이터
   * @constant userResumesTag 유저의 Resumes에서 Tag 데이터
   * @constant userResumesAll 유저의 Resumes에서 완료와 임시글 상태
   *
   */

  const [userSchedulesColumn, setUserSchedulesColumn] = React.useState<
    { column: string; count: number[] }[]
  >([]);

  const [userSchedulesDepartment, setUserSchedulesDepartment] = React.useState<
    { department: string; count: number }[]
  >([]);

  const [userResumesTag, setResumesTag] = React.useState<
    { tag: string; count: number }[]
  >([]);

  const [userResumesAll, setResumesAll] = React.useState<{
    isPublishing: number;
    isNotPublishing: number;
  }>();

  // 나의 입사 지원 현황
  React.useEffect(() => {
    /**
     * @description userColumnOfSchedules에서 column 전처리
     */
    if (!userColumnOfSchedules?.data) return;
    const snapshot = [...userColumnOfSchedules.data];
    const sortedData = [
      ...snapshot.sort((a, b) =>
        scheduleChartDict[a.column] < scheduleChartDict[b.column]
          ? -1
          : scheduleChartDict[a.column] > scheduleChartDict[b.column]
          ? 1
          : 0
      ),
    ].map(({ column, count }) => ({
      column: scheduleChartDict[column],
      count: [count],
    }));
    if (!sortedData) return;

    setUserSchedulesColumn(sortedData);

    return () => setUserSchedulesColumn([]);
  }, [userColumnOfSchedules]);

  // 내가 가장 많이 지원한 직무 TOP 20
  React.useEffect(() => {
    /**
     * @description userDepartmentOfSchedules에서 department 전처리
     */
    if (!userDepartmentOfSchedules?.data) return;

    const refinedDepartmentOfUserDepartment = userDepartmentOfSchedules.data
      ?.sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setUserSchedulesDepartment(refinedDepartmentOfUserDepartment);

    return () => setUserSchedulesDepartment([]);
  }, [userDepartmentOfSchedules]);

  // 나의 가장 많이 쓴 자소서 유형 TOP 20
  React.useEffect(() => {
    /**
     * @description userTagOfResumes에서 tag 전처리
     */
    if (!userTagOfResumes?.data) return;
    const snapshot = [...userTagOfResumes?.data];

    const sortedData = [
      ...snapshot?.sort((a, b) => b.count - a.count).splice(0, 20),
    ];

    if (!sortedData) return;

    setResumesTag(sortedData);

    return () => setResumesTag([]);
  }, [userTagOfResumes]);

  React.useEffect(() => {
    /**
     * @description 완료/임시글
     */
    if (!userAllOfResumes?.data) return;
    const snapshot = { ...userAllOfResumes?.data };
    setResumesAll(snapshot);

    return () => setResumesAll({ isNotPublishing: 0, isPublishing: 0 });
  }, [userAllOfResumes]);

  React.useEffect(() => {
    /**
     * @de페이지 마운트시 userTagOfResumes refetch
     */
    userTagOfResumesRefetch();

    return () => {
      userTagOfResumesRefetch();
    };
  }, []);

  if (columnError || departmentError || tagError || allError)
    return <div>Error</div>;

  return (
    <>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="left"
        paddingTop={20}
        paddingBottom={20}
        css={textStyle}
      >
        마이 데이터 분석
      </Text>
      <Text
        fontSize="xl"
        fontWeight={700}
        textAlign="left"
        paddingTop={20}
        css={textStyle}
      >
        1. 나의 입사 지원 현황 분석 {emoji.SCHEDULE}
      </Text>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        placeItems="center"
        css={newGridStyle}
      >
        <Chart
          loading={columnIsLoading}
          type="bar"
          subOption={{
            text: "나의 입사 지원 현황",
            categories: ["2023 상반기 (1월 ~ 6월)"],
          }}
          series={checkSeries(
            userSchedulesColumn.map(({ column: name, count: data }) => ({
              name,
              data,
            }))
          )}
        />

        <Chart
          loading={departmentIsLoading}
          type="polarArea"
          subOption={{
            label: userSchedulesDepartment.map(({ department }) => department),
            text: "내가 가장 많이 지원한 직무 TOP 20",
          }}
          series={userSchedulesDepartment.map(({ count }) => count)}
        />
      </Grid>

      <Text
        fontSize="xl"
        fontWeight={700}
        textAlign="left"
        paddingTop={20}
        css={textStyle}
      >
        2. 나의 자기소개서 분석 {emoji.ME}
      </Text>

      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        placeItems="center"
        css={newGridStyle}
      >
        <Chart
          loading={tagIsLoading}
          type="treemap"
          subOption={{ text: "나의 가장 많이 쓴 자소서 유형 TOP 20" }}
          series={
            userResumesTag.length > 0
              ? [
                  {
                    data: userResumesTag.map(({ tag: x, count: y }) => ({
                      x,
                      y,
                    })),
                  },
                ]
              : undefined
          }
        />

        <Chart
          loading={allIsLoading}
          type="donut"
          series={
            userResumesAll?.isPublishing || userResumesAll?.isNotPublishing
              ? [userResumesAll?.isPublishing, userResumesAll?.isNotPublishing]
              : undefined
          }
          subOption={{
            text: "나의 자기소개서 작성 현황",
            label: ["작성 완료", "작성 중"],
          }}
        />
      </Grid>
    </>
  );
};
export default MyDataCharts;

const textStyle = css`
  display: block;
  height: 50px;
`;

const newGridStyle = css`
  padding: 1rem 0;
  width: 100%;

  ${media[0]} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${media[1]} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${media[2]} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
