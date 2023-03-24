import React from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";

import { getAllResumes } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";
import { getAllSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

import { ResumesType } from "types/resumes";
import { SchedulesType } from "types/schedule";

import Text from "_common/components/text";
import Grid from "_common/components/grid";

import {
  barOption,
  donutOptions,
  treemapOptions,
} from "components/chart/index.options";
import { getAllData } from "lib/apis/api/allServerData";
import Chart from "components/chart";

interface AllResumes {
  apply: {
    company?: string;
    department?: string;
  };
  tag: string[];
}

const Home = () => {
  const newDict: any = {};

  const {
    data: resumes,
    isLoading: rLoading,
    isError: rError,
    refetch,
  } = useQuery<ResumesType[]>(QueryKeys.RESUMES(), () =>
    getAllResumes().then(getResumesService)
  );
  const {
    data: schedules,
    isLoading: sLoading,
    isError: SError,
  } = useQuery<SchedulesType>(QueryKeys.SCHEDULES, () =>
    getAllSchedules().then(getSchedulesList)
  );

  const { data: allResumes } = useQuery(QueryKeys.ALL_DATA("resumes"), () =>
    getAllData("resumes")
  );
  const { data: allSchedules } = useQuery(QueryKeys.ALL_DATA("schedules"), () =>
    getAllData("schedules")
  );

  const [allResumesData, setAllResumesData] = React.useState<any>({});

  React.useEffect(() => {
    allResumes?.map((item: AllResumes) =>
      item.tag?.map((data) => {
        setAllResumesData((allData: any) => {
          if (allData[data]) {
            return {
              ...allData,
              [data]: allData[data] + 1,
            };
          }
          return {
            ...allData,
            [data]: 1,
          };
        });
      })
    );
  }, []);

  console.log(allResumesData);
  React.useEffect(() => {
    document.body.style.backgroundColor = "#EFF4F7";
    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);

  return (
    <>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        style={{ height: "10px", padding: "2rem 0" }}
      >
        전체 데이터 분석
      </Text>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        placeItems="center"
        padding="3rem 0 "
        style={{ boxSizing: "border-box" }}
      >
        <Chart
          type={barOption.type}
          series={barOption.series}
          options={barOption.options}
          width="100%"
          height="100%"
        />
        <Chart
          type={treemapOptions.type}
          series={treemapOptions.series}
          options={treemapOptions.options}
          width="100%"
          height="100%"
        />
      </Grid>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        style={{ height: "10px", padding: "2rem 0" }}
      >
        마이 데이터 분석
      </Text>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        placeItems="center"
        padding="3rem 0 "
        style={{ boxSizing: "border-box" }}
      >
        <Chart
          type={barOption.type}
          series={barOption.series}
          options={barOption.options}
          width="100%"
          height="100%"
        />
        <Chart
          type={treemapOptions.type}
          series={treemapOptions.series}
          options={treemapOptions.options}
          width="100%"
          height="100%"
        />
        <Chart
          type={donutOptions.type}
          series={donutOptions.series}
          options={donutOptions.options}
          width="100%"
          height="100%"
        />

        {/* <BackGround /> */}
      </Grid>
    </>
  );
};
export default Home;
