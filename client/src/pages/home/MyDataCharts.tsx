import React from "react";

import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";

import Chart from "components/chart";
import { checkSeries } from "utils/helpers";
import {
  getUserResumesAll,
  getUserResumesByCategory,
  getUserSchedulesByCategory,
} from "lib/apis/api/charts";
import { ColumnType } from "types/schedule";
import { scheduleChartDict } from "utils/constants";

const MyDataCharts = ({
  schedules,
  resumes,
}: {
  schedules?: boolean;
  resumes?: boolean;
}) => {
  /**
   * @description 차트에서 사용할 TOTAL 데이터의 useQuery
   * Schedules
   * @constant userColumnOfSchedule 전체 이력서 데이터로 schedules의 company 데이터 (bar차트)
   * @constant userDepartmentOfSchedules 전체 입사 지원 현황 데이터로 resumes의 department 데이터 (polarArea차트)
   * Resumes
   * @constant  userTagOfResumes 유저의 자기소개서(Resumes)의 데이터 중 Tag 데이터 (treemap 차트)
   * @constant userAllOfResumes 유저의 자기소개서(Resumes) 데이터 중 완료와 임시글 (donut 차트)
   */
  const { data: userColumnOfSchedules } = useQuery<
    { column: ColumnType; count: number }[]
  >(QueryKeys.USER_CHART_SCHEDULES_BY_CATEGORY("column"), () =>
    getUserSchedulesByCategory("column")
  );

  const { data: userDepartmentOfSchedules } = useQuery<
    { department: string; count: number }[]
  >(QueryKeys.USER_CHART_SCHEDULES_BY_CATEGORY("department"), () =>
    getUserSchedulesByCategory("department")
  );

  const { data: userTagOfResumes } = useQuery<{ tag: string; count: number }[]>(
    [{ type: "resumes", category: "tag" }],
    // QueryKeys.USER_CHART_RESUMES_BY_CATEGORY("tag"),
    () => getUserResumesByCategory({ category: "tag", publishing: true })
  );

  // const { data: newUserTagOfResumes } = useQuery<
  //   { tag: string; count: number }[]
  // >([{ type: "resumes", category: "tag" }], () =>
  //   getUserResumesByCategory({ category: "tag", publishing: true })
  // );

  const { data: userAllOfResumes } = useQuery<{
    isPublishing: number;
    isNotPublishing: number;
  }>(QueryKeys.USER_CHART_ALL_RESUMES(), () => getUserResumesAll());

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
    if (!userColumnOfSchedules) return;

    const columnOfSchedules = userColumnOfSchedules.sort((a, b) =>
      scheduleChartDict[a.column] < scheduleChartDict[b.column]
        ? -1
        : scheduleChartDict[a.column] > scheduleChartDict[b.column]
        ? 1
        : 0
    );
    const refinedColumnOfUserSchedules = columnOfSchedules.map(
      ({ column, count }) => ({
        column: scheduleChartDict[column],
        count: [count],
      })
    );
    if (!refinedColumnOfUserSchedules) return;

    setUserSchedulesColumn(refinedColumnOfUserSchedules);

    // return () => setUserSchedulesColumn([]);
  }, [userColumnOfSchedules]);

  // 내가 가장 많이 지원한 직무 TOP 20
  React.useEffect(() => {
    /**
     * @description userDepartmentOfSchedules에서 department 전처리
     */
    if (!userDepartmentOfSchedules) return;

    const refinedDepartmentOfUserDepartment = userDepartmentOfSchedules
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setUserSchedulesDepartment(refinedDepartmentOfUserDepartment);

    // return () => setUserSchedulesDepartment([]);
  }, [userDepartmentOfSchedules]);

  // 나의 가장 많이 쓴 자소서 유형 TOP 20
  React.useEffect(() => {
    /**
     * @description userTagOfResumes에서 tag 전처리
     */
    if (!userTagOfResumes) return;

    const tagOfResumes = userTagOfResumes
      ?.sort((a, b) => b.count - a.count)
      .splice(0, 20);

    if (!tagOfResumes) return;

    setResumesTag(tagOfResumes);

    // return () => setResumesTag([]);
  }, [userTagOfResumes]);

  React.useEffect(() => {
    /**
     * @description 완료/임시글
     */
    if (!userAllOfResumes) return;
    setResumesAll(userAllOfResumes);

    // return () => setResumesAll({ isNotPublishing: 0, isPublishing: 0 });
  }, [userAllOfResumes]);

  console.log(userTagOfResumes, userResumesTag);
  return (
    <>
      {schedules && (
        <>
          <Chart
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
            type="polarArea"
            subOption={{
              label: userSchedulesDepartment.map(
                ({ department }) => department
              ),
              text: "내가 가장 많이 지원한 직무 TOP 20",
            }}
            series={userSchedulesDepartment.map(({ count }) => count)}
          />
        </>
      )}
      {resumes && (
        <>
          <Chart
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
            type="donut"
            series={
              userResumesAll?.isPublishing || userResumesAll?.isNotPublishing
                ? [
                    userResumesAll?.isPublishing,
                    userResumesAll?.isNotPublishing,
                  ]
                : undefined
            }
            subOption={{
              text: "나의 자기소개서 작성 현황",
              label: ["작성 완료", "작성 중"],
            }}
          />
        </>
      )}
    </>
  );
};
export default MyDataCharts;
