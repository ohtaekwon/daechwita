/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useQuery } from "react-query";
import { QueryKeys } from "queryClient";

import { getTotalChartData, getUserChartData } from "lib/apis/api/charts";
import useUser from "lib/firebase/useUser";

import Text from "_common/components/text";
import Grid from "_common/components/grid";

import Chart from "components/chart";

import { ChartResumes, ChartSchedules } from "types/chart";
import { ColumnType } from "types/schedule";

import { emoji, scheduleChartDict } from "utils/constants";
import { media } from "utils/media";
import { theme } from "styles";

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

  // 전체 데이터
  const { data: totalSchedules } = useQuery(
    QueryKeys.TOTAL_CHART_SCHEDULES(),
    () => getTotalChartData("schedules"),
    {}
  );
  const { data: totalChartResumes } = useQuery(
    QueryKeys.TOTAL_CHART_RESUMES(),
    () => getTotalChartData("resumes"),
    {}
  );

  // 마이 데이터
  const { data: userChartSchedules } = useQuery(
    QueryKeys.USER_CHART_SCHEDULES(),
    () => getUserChartData("schedules"),
    {}
  );

  const { data: userChartAllResumesIsPub } = useQuery(
    QueryKeys.USER_CHART_RESUMES(),
    () => getUserChartData("resumes", true),
    {}
  );
  const { data: userChartAllResumesIsNotPub } = useQuery(
    QueryKeys.USER_CHART_ALL_RESUMES(`${user?.uid}, temp`),
    () => getUserChartData("resumes", false),
    {}
  );
  console.log(userChartSchedules);

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
  const [refinedTotalSchedules, setRefinedTotalSchedules] = React.useState<
    { name: string; data: number[] }[]
  >([]);

  const [refinedTotalResumes, setRefinedTotalResumes] = React.useState<
    { x: string; y: number }[]
  >([]);
  // 마이데이터
  const [refinedUserSchedules, setRefinedUserSchedules] = React.useState<
    { name: ColumnType; data: number[] }[]
  >([]);
  const [refinedUserApply, setRefinedUserApply] = React.useState<
    { job: string; count: number }[]
  >([]);
  const [refinedUserResumes, setRefinedUserResumes] = React.useState<
    { x: string; y: number }[]
  >([]);

  const [refinedUserWrite, setRefinedUserWrite] = React.useState<{
    finish: number;
    yet: number;
  }>({ finish: 0, yet: 0 });

  console.log(refinedUserSchedules);
  const [userResumes, setUserResumes] = React.useState([]);

  // 1. 전체 데이터 - 유저들이 가장 많이 지원한 기업 TOP 20
  React.useEffect(() => {
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
    return () => setRefinedTotalSchedules([]);
  }, [totalSchedules]);

  // 2. 전체 데이터 - 다른 사람들이 가장 많이 쓴 자소서 유형
  React.useEffect(() => {
    /**
     * @description totalChartResumes 모든 이력서 전체 데이터
     */
    totalChartResumes?.map((item: ChartResumes) =>
      item.tag?.map((tagname: string) => {
        setRefinedTotalResumes((allData) => {
          const snapshot = allData;
          if (tagname === "") return snapshot;

          const targetIndex = allData.findIndex(
            (item: { x: string; y: number }) => item.x === tagname
          );

          if (targetIndex < 0) {
            return [...allData, { x: tagname, y: 1 }];
          } else {
            snapshot.splice(targetIndex, 1, {
              x: snapshot[targetIndex].x,
              y: snapshot[targetIndex].y + 1,
            });
            return snapshot;
          }
        });
      })
    );
    return () => {
      setRefinedTotalResumes([]);
    };
  }, [totalChartResumes]);

  // 3. 마이 데이터 - 나의 입사 지원 현황
  // 4. 마이데이터 - 내가 가장 많이 지원한 직무 TOP 20
  React.useEffect(() => {
    userChartSchedules?.map(({ column, application }: ChartSchedules) => {
      /**
       * @description 3. userChartSchedules 자신의 입사 지원 현황 데이터
       */
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
      /**
       * @description 4. userChartSchedules 자신의 입사 지원 현황 데이터
       */
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

    return () => {
      setRefinedUserSchedules([]);
      setRefinedUserApply([]);
    };
  }, [userChartSchedules]);

  // 5. 마이 데이터 - 나의 가장 많이 쓴 자소서 유형 TOP 20
  React.useEffect(() => {
    /**
     * @description userChartResumes 자신의 이력서 전체 데이터
     */
    setUserResumes(userChartAllResumesIsPub);

    // 6. 마이 데이터 - 나의 자기소개서 작성 현황 (출간)
    setRefinedUserWrite((prev) => {
      return {
        ...prev,
        finish: userChartAllResumesIsPub?.length || 0,
      };
    });

    return () => {
      setRefinedUserResumes([]);
      setRefinedUserWrite({ finish: 0, yet: 0 });
    };
  }, [userChartAllResumesIsPub]);

  // 6. 마이 데이터 - 나의 자기소개서 작성 현황 (임시 저장)
  React.useEffect(() => {
    setRefinedUserWrite((prev) => {
      return {
        ...prev,
        yet: userChartAllResumesIsNotPub?.length || 0,
      };
    });
    return () => setRefinedUserWrite({ finish: 0, yet: 0 });
  }, [userChartAllResumesIsNotPub]);

  React.useEffect(() => {
    document.body.style.backgroundColor = theme.colors.lightBlue_50;
    return () => {
      document.body.style.backgroundColor = theme.colors.transparent;
    };
  }, []);

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

  function checkSeries(array: any[] = []) {
    return array.length > 0 ? array : undefined;
  }

  const newArray: string[] = [];
  const newDict: { [key: string]: number } = {};
  const userTreemapData: { x: string; y: number }[] = [];

  userResumes
    ?.map((item: ChartResumes) => item.tag?.map((tagname: string) => tagname))
    .map((item: string[]) =>
      item.map((i) => {
        if (i !== "") {
          newArray.push(i);
        }
      })
    );
  newArray.forEach((x) => {
    newDict[x] = (newDict[x] || 0) + 1;
  });
  Object.keys(newDict).map((item, index) =>
    userTreemapData.push({
      x: item,
      y: newDict[item],
    })
  );

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
          type="treemap"
          subOption={{ text: "나의 가장 많이 쓴 자소서 유형 TOP 20" }}
          series={
            userTreemapData.length > 0
              ? [
                  {
                    data: userTreemapData
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

const textStyle = css`
  display: block;
  height: 50px;
`;
const gridStyle = css`
  padding: 1rem 0;
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
