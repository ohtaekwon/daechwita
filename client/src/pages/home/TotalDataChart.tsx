import React from "react";

import Chart from "components/chart";

import { checkSeries } from "utils/helpers";
import { ColumnType } from "types/schedule";

interface Props {
  schedules: {
    company: string;
    count: number;
  }[];

  // resumes:any
}

const TotalDataChart = ({
  schedules,
}: // resumes,
Props) => {
  const refinedCompanyOfSchedules = schedules
    .map(({ company: name, count: data }) => ({ name, data }))
    .map((item) => ({
      ...item,
      data: [item.data],
    }));

  return (
    <>
      <Chart
        type="bar"
        subOption={{
          text: "유저들이 가장 많이 지원한 기업 TOP 20",
          categories: ["TOP 20 기업"],
        }}
        series={checkSeries(refinedCompanyOfSchedules)
          ?.sort((a, b) => b.data[0] - a.data[0])
          .splice(0, 20)}
      />
      {/* <Chart
        type="treemap"
        subOption={{ text: "다른 사람들이 가장 많이 쓴 자소서 유형 TOP20" }}
        series={[
          {
            data: resumesData,
            // sort((a, b) => b.y - a.y).slice(0, 20),
          },
        ]}
      /> */}
    </>
  );
};
export default TotalDataChart;
