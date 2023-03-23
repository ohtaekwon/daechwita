import React from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";
import ApexChart from "react-apexcharts";

import { getAllResumes } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";
import { getAllSchedules } from "lib/apis/api/schedules";
import { getSchedulesList } from "lib/apis/service/getSchedulesList";

import { ResumesType } from "types/resumes";
import { SchedulesType } from "types/schedule";

import Grid from "_common/components/grid";
import Box from "_common/components/box";

import { barOption, donutOptions, treemapOptions } from "./chartOptions";

const Home = () => {
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

  console.log(resumes, schedules);

  React.useEffect(() => {
    document.body.style.backgroundColor = "#eaeaf0;";
    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);
  return (
    <>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="repeat(2, 1fr)"
        placeItems="center"
      >
        <Box
          variant="gray_200_border"
          width="100%"
          height="500px"
          padding="1rem"
        >
          <ApexChart
            series={barOption.series}
            options={barOption.options}
            type={barOption.type}
            width="100%"
            height="100%"
          />
        </Box>
        <Box
          variant="gray_200_border"
          width="100%"
          height="500px"
          padding="1rem"
        >
          <ApexChart
            type={donutOptions.type}
            series={donutOptions.series}
            options={donutOptions.options}
            width="100%"
            height="100%"
          />
        </Box>
        <Box
          variant="gray_200_border"
          width="100%"
          height="500px"
          padding="1rem"
        >
          <ApexChart
            type={treemapOptions.type}
            series={treemapOptions.series}
            options={treemapOptions.options}
            width="100%"
            height="100%"
          />
        </Box>
        {/* <BackGround /> */}
      </Grid>
    </>
  );
};
export default Home;
