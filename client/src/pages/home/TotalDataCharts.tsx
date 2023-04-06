/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";
import {
  getTotalResumesByCategory,
  getTotalSchedulesByCategory,
} from "lib/apis/api/charts";
import Chart from "components/Chart";

import Text from "_common/components/Text";
import Grid from "_common/components/Grid";

import { checkSeries } from "utils/helpers";

const TotalDataCharts = () => {
  /**
   * @description 차트에서 사용할 TOTAL 데이터의 useQuery
   *
   * @constant totalCompanyOfSchedules 전체 이력서 데이터로 schedules의 company 데이터
   * @constant totalTagOfResume 전체 입사 지원 현황 데이터로 resumes의 tag 데이터
   */
  const { data: totalCompanyOfSchedules, isLoading: CIsLoading } = useQuery<
    { company: string; count: number }[]
  >(QueryKeys.TOTAL_CHART_SCHEDULES_BY_CATEGORY("company"), () =>
    getTotalSchedulesByCategory("company")
  );
  const { data: totalTagOfResumes, isLoading: TisLoading } = useQuery<
    { tag: string; count: number }[]
  >(QueryKeys.TOTAL_CHART_RESUMES_BY_CATEGORY("tag"), () =>
    getTotalResumesByCategory("tag")
  );

  /**
   * @constant totalSchedulesCompany 유저들이 가장 많이 지원한 기업 TOP 20 상태관리(bar 차트)
   * @constant totalResumesTag 다른 사람들이 가장 많이 쓴 자소서 유형 TOP20 상태관리(treemap 차트)
   */
  const [totalSchedulesCompany, setTotalSchedulesCompany] = React.useState<
    { data: number[]; name: string }[]
  >([]);
  const [totalResumesTag, setTotalResumesTag] = React.useState<
    { tag: string; count: number }[]
  >([]);

  // 유저들이 가장 많이 지원한 기업 TOP 20
  React.useEffect(() => {
    /**
     * @description  totalCompanyOfSchedules 모든 입사 지원 현황의 전체 데이터 중 company
     */
    if (!totalCompanyOfSchedules) return;

    const companyOfSchedules = totalCompanyOfSchedules
      ?.map(({ company: name, count: data }) => ({ name, data }))
      .sort((a, b) => b.data - a.data)
      .splice(0, 20);

    const refinedCompanyOfSchedules = companyOfSchedules.map((item) => ({
      ...item,
      data: [item.data],
    }));
    if (!refinedCompanyOfSchedules) return;
    setTotalSchedulesCompany(refinedCompanyOfSchedules);

    return () => setTotalSchedulesCompany([]);
  }, [totalCompanyOfSchedules]);

  // 다른 사람들이 가장 많이 쓴 자소서 유형
  React.useEffect(() => {
    /**
     * @description totalTagOfResumes 모든 이력서 전체 데이터 중 tag
     */
    if (!totalTagOfResumes) return;

    const tagOfResumes = totalTagOfResumes
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    if (!tagOfResumes) return;
    setTotalResumesTag(totalTagOfResumes);

    return () => setTotalResumesTag([]);
  }, [totalTagOfResumes]);

  return (
    <>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        paddingTop={20}
        paddingBottom={20}
      >
        전체 데이터 분석
      </Text>

      <Grid
        gridTemplateColumns="repeat(1, 1fr)"
        placeItems="center"
        css={gridStyle}
      >
        {CIsLoading ? (
          <div>Loading....</div>
        ) : (
          <Chart
            type="bar"
            subOption={{
              text: "유저들이 가장 많이 지원한 기업 TOP 20",
              categories: ["TOP 20 기업"],
            }}
            series={checkSeries(totalSchedulesCompany)}
          />
        )}

        {TisLoading ? (
          <div>Loading....</div>
        ) : (
          <Chart
            type="treemap"
            subOption={{ text: "다른 사람들이 가장 많이 쓴 자소서 유형 TOP20" }}
            series={[
              {
                data: totalResumesTag?.map(({ tag: x, count: y }) => ({
                  x,
                  y,
                })),
              },
            ]}
          />
        )}
      </Grid>
    </>
  );
};
export default TotalDataCharts;

const gridStyle = css`
  padding: 1rem 0;
`;
