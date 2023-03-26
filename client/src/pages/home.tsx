import React from "react";

import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";

import { getTotalChartData, getUserChartData } from "lib/apis/api/chartData";

import Text from "_common/components/text";
import Grid from "_common/components/grid";

import Chart from "components/chart";

import { ChartResumes, ChartSchedules } from "types/chart";
import { ColumnType } from "types/schedule";
import { emoji, scheduleChartDict } from "utils/constants";
import useUser from "lib/firebase/useUser";

const Home = () => {
  const { user } = useUser();

  /**
   * @description 차트에서 사용할 데이터의 useQuery
   *
   * @constant totalChartResumes 전체 이력서 데이터
   * @constant totalSchedules 전체 입사 지원 현황 데이터
   *
   * @constant userChartResumes 자신의 이력서 전체 데이터
   * @constant userChartSchedules 자신의 입사 지원 현황 전체 데이터
   */

  const { data: totalChartResumes } = useQuery(
    QueryKeys.TOTAL_CHART_RESUMES(user?.uid),
    () => getTotalChartData("resumes"),
    {
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      retry: true,
    }
  );
  const { data: totalSchedules } = useQuery(
    QueryKeys.TOTAL_CHART_SCHEDULES(user?.uid),
    () => getTotalChartData("schedules")
  );
  const { data: userChartResumes } = useQuery(
    QueryKeys.USER_CHART_RESUMES(user?.uid),
    () => getUserChartData("resumes"),
    {
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      retry: true,
    }
  );
  const { data: userChartAllResumes } = useQuery(
    QueryKeys.USER_CHART_RESUMES(`${user?.uid}-all`),
    () => getUserChartData("resumes", false),
    {
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      retry: true,
    }
  );

  const { data: userChartSchedules } = useQuery(
    QueryKeys.USER_CHART_SCHEDULES(user?.uid),
    () => getUserChartData("schedules"),
    {
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      retry: true,
    }
  );
  /**
   * @abstract 전체 데이터
   * @constant refinedTotalResumes 1. 정제된 이력서 전체 데이터(resumes) - 전체 가장 자소서 많이 쓴 유형 상태관리(treemap 차트)
   * @constant
   *
   * @abstract 마이 데이터
   * @constant refinedUserResumes 3. 정제된 이력서 마이 데이터(resumes) - 나의 가장 많이 쓴 자소서 유형 상태관리(treemap 차트)
   * @constant refinedUserSchedules 4. 정제된 마이 데이터(schedules) - 나의 입사 지원 현황 상태관리(bar 차트)
   * @constant refinedUserApply 5. 정제된 이력서 마이 데이터(schedules) - 내가 가장 많이 지원한 직무 상태관리(polarArea 차트)
   */

  // 전체 데이터
  const [refinedTotalResumes, setRefinedTotalResumes] = React.useState<
    { x: string; y: number }[]
  >([]);
  const [refinedTotalSchedules, setRefinedTotalSchedules] = React.useState<
    { name: string; data: number[] }[]
  >([]);

  // 마이데이터
  const [refinedUserResumes, setRefinedUserResumes] = React.useState<
    { x: string; y: number }[]
  >([]);
  const [refinedUserSchedules, setRefinedUserSchedules] = React.useState<
    { name: ColumnType; data: number[] }[]
  >([]);
  const [refinedUserApply, setRefinedUserApply] = React.useState<
    { job: string; count: number }[]
  >([]);
  const [refinedUserWrite, setRefinedUserWrite] = React.useState<{
    finish: number;
    yet: number;
  }>({ finish: 0, yet: 0 });

  // 1. 전체 데이터 - 전체 가장 자소서 많이 쓴 유형
  React.useMemo(() => {
    /**
     * @description totalChartResumes 모든 이력서 전체 데이터
     */
    totalChartResumes?.map((item: ChartResumes) =>
      item.tag?.map((tagname: string) => {
        setRefinedTotalResumes((allData) => {
          const snapshot = allData;
          if (tagname === "") return snapshot;

          const target = snapshot.find(
            (item: { x: string; y: number }) => item.x === tagname
          );
          const targetIndex = allData.findIndex(
            (item: { x: string; y: number }) => item.x === tagname
          );

          if (targetIndex < 0) {
            return [...allData, { x: tagname, y: 1 }];
          } else {
            const newData = { x: target?.x!, y: target?.y! + 1 };
            snapshot.splice(targetIndex, 1, newData);
            return snapshot;
          }
        });
      })
    );
  }, [totalChartResumes]);

  React.useMemo(() => {
    /**
     * @description  totalSchedules 모든 입사 지원 현황의 전체 데이터
     */
    totalSchedules?.map(({ application: { company } }: ChartSchedules) => {
      setRefinedTotalSchedules((allData) => {
        const snapshot = allData;

        const target = snapshot.find(
          ({ name, data }: { name: string; data: number[] }) => name === company
        );

        if (target?.name === "") {
          console.log("노네임", target);
          return [...allData];
        }

        const targetIndex = snapshot.findIndex(
          ({ name, data }: { name: string; data: number[] }) => name === company
        );

        if (targetIndex < 0) {
          return [...allData, { name: company, data: [1] }];
        } else {
          const newData = { name: company, data: [(target!.data[0] += 1)] };
          snapshot.splice(targetIndex, 1, newData);
          return snapshot;
        }
      });
    });
  }, [totalSchedules]);

  // 3. 마이 데이터 - 나의 가장 많이 쓴 자소서 유형
  React.useMemo(() => {
    /**
     * @description userChartResumes 자신의 이력서 전체 데이터
     */
    userChartResumes?.map((item: ChartResumes) =>
      item.tag?.map((tagname: string) => {
        setRefinedUserResumes((allData) => {
          const snapshot = allData;
          if (tagname === "") return snapshot;

          const target = snapshot.find(
            (item: { x: string; y: number }) => item.x === tagname
          );

          const targetIndex = allData.findIndex(
            (item: { x: string; y: number }) => item.x === tagname
          );

          if (targetIndex < 0) {
            return [...allData, { x: tagname, y: 1 }];
          } else {
            const newData = { x: target?.x!, y: target?.y! + 1 };
            snapshot.splice(targetIndex, 1, newData);
            return snapshot;
          }
        });
      })
    );
  }, [userChartResumes]);

  // 4. 마이 데이터 - 나의 입사 지원 현황
  React.useMemo(() => {
    /**
     * @description userChartSchedules 자신의 입사 지원 현황 데이터
     */
    userChartSchedules?.map(({ column, application }: ChartSchedules) => {
      setRefinedUserSchedules((allData) => {
        const snapshot = allData;
        const target = snapshot.find(
          ({ name, data }: { name: ColumnType; data: number[] }) =>
            name === column
        );

        const targetIndex = snapshot.findIndex(
          ({ name, data }: { name: ColumnType; data: number[] }) =>
            name === column
        );

        if (targetIndex < 0) {
          return [...allData, { name: column, data: [1] }];
        } else {
          const newData = { name: column, data: [(target!.data[0] += 1)] };
          snapshot.splice(targetIndex, 1, newData);
          return snapshot;
        }
      });
    });
  }, [userChartSchedules]);

  // 5. 마이 데이터 - 내가 가장 많이 지원한 직무
  React.useMemo(() => {
    /**
     * @description userChartSchedules 자신의 입사 지원 현황 데이터
     */
    userChartSchedules?.map(({ column, application }: ChartSchedules) => {
      setRefinedUserApply((allData) => {
        const snapshot = allData.sort((a, b) => b.count - a.count);
        if (application.department === "") return snapshot;

        const target = snapshot?.find(
          ({ job, count }: { job: string; count: number }) =>
            job === application.department
        );

        const targetIndex = snapshot?.findIndex(
          ({ job, count }: { job: string; count: number }) =>
            job === application.department
        );

        if (targetIndex < 0 || targetIndex === undefined) {
          return [...allData, { job: application.department, count: 1 }];
        } else {
          const newData = { job: target!.job, count: target!.count + 1 };
          snapshot.splice(targetIndex, 1, newData);
          return snapshot;
        }
      });
    });
  }, [userChartSchedules]);

  // 6. 마이데이터 - 나의 자기소개서 작성 현황
  React.useMemo(() => {
    userChartAllResumes?.map(({ apply, tag }: ChartResumes) => {
      setRefinedUserWrite((allData) => {
        const snapshot = { ...allData };

        if (apply.company === "" || apply.department === "" || tag[0] === "") {
          return {
            ...allData,
            yet: snapshot.yet + 1,
          };
        }
        return {
          ...allData,
          finish: snapshot.finish + 1,
        };
      });
    });
  }, [userChartAllResumes]);

  const newTotalSchedules = refinedTotalSchedules
    .map((item) => {
      return { name: item.name, data: item.data };
    })
    .sort((a, b) => b.data[0] - a.data[0]);

  const newUserSchedules = refinedUserSchedules
    .map((item) => {
      return { name: scheduleChartDict[item.name], data: item.data };
    })
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  // 마이데이터 - 내가 많이 지원한 직무
  const polarAreaJobArray: string[] = [];
  const polarAreaCountArray: number[] = [];
  refinedUserApply
    .sort((a, b) => b.count - a.count)
    .forEach(({ job, count }) => {
      polarAreaJobArray.push(job);
      polarAreaCountArray.push(count);
    });

  React.useEffect(() => {
    document.body.style.backgroundColor = "#EFF4F7";
    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);

  function checkSeries(array: any[] = []) {
    return array.length > 0 ? array : undefined;
  }
  // console.log(newTotalSchedules, totalSchedules);
  // console.log(totalChartResumes);

  console.log("완료 ", userChartAllResumes);
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
        padding="1rem 0 "
      >
        <Chart
          type="bar"
          subOption={{
            text: "유저들이 가장 많이 지원한 기업 TOP 20",
            categories: ["TOP 20 기업"],
          }}
          series={checkSeries(newTotalSchedules)?.splice(0, 20)}
        />

        <Chart
          type="treemap"
          subOption={{ text: "다른 사람들이 가장 많이 쓴 자소서 유형 TOP20" }}
          series={[
            {
              data: refinedTotalResumes.sort((a, b) => b.y - a.y).slice(0, 20),
            },
          ]}
        />
      </Grid>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="left"
        paddingTop={20}
        paddingBottom={20}
        style={{ display: "block", height: "50px" }}
      >
        마이 데이터 분석
      </Text>
      <Text
        fontSize="xl"
        fontWeight={700}
        textAlign="left"
        paddingTop={20}
        style={{ display: "block", height: "50px" }}
      >
        1. 나의 입사 지원 현황 분석 {emoji.SCHEDULE}
      </Text>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        placeItems="center"
        padding="1rem 0 "
      >
        <Chart
          type="bar"
          subOption={{
            text: "나의 입사 지원 현황",
            categories: ["2023 상반기 (1월 ~ 6월)"],
          }}
          series={checkSeries(newUserSchedules)}
        />
        <Chart
          type="polarArea"
          subOption={{
            label: polarAreaJobArray.slice(0, 20),
            text: "내가 가장 많이 지원한 직무 TOP 20",
          }}
          series={checkSeries(polarAreaCountArray)?.slice(0, 20)}
        />
      </Grid>
      <Text
        fontSize="xl"
        fontWeight={700}
        textAlign="left"
        paddingTop={20}
        style={{ display: "block", height: "50px" }}
      >
        2. 나의 자기소개서 분석 {emoji.ME}
      </Text>

      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        placeItems="center"
        padding="1rem 0 "
      >
        <Chart
          type="treemap"
          subOption={{ text: "나의 가장 많이 쓴 자소서 유형 TOP 20" }}
          series={
            refinedUserResumes.length > 0
              ? [
                  {
                    data: refinedUserResumes
                      .sort((a, b) => b.y - a.y)
                      .splice(0, 20),
                  },
                ]
              : undefined
          }
        />
        <Chart
          type="donut"
          series={
            refinedUserWrite.finish > 0
              ? [refinedUserWrite.finish, refinedUserWrite.yet]
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
export default Home;

{
  /* <BackGround /> */
}
// const {
//   data: resumes,
//   isLoading: rLoading,
//   isError: rError,
//   refetch,
// } = useQuery<ResumesType[]>(QueryKeys.RESUMES(), () =>
//   getAllResumes().then(getResumesService)
// );
// const {
//   data: schedules,
//   isLoading: sLoading,
//   isError: SError,
// } = useQuery<SchedulesType>(QueryKeys.SCHEDULES, () =>
//   getAllSchedules().then(getSchedulesList)
// );

// const [totalData, setTotalData] = React.useState({
//   allResumes: [],
//   allSchedules: [],
// });

// React.useEffect(() => {
//   getTotalChartData("resumes").then((res) =>
//     setTotalData((allData: any) => {
//       return {
//         ...allData,
//         ["allResumes"]: res,
//       };
//     })
//   );
//   getTotalChartData("schedules").then((res) =>
//     setTotalData((allData: any) => {
//       return {
//         ...allData,
//         ["allSchedules"]: res,
//       };
//     })
//   );
// }, []);
