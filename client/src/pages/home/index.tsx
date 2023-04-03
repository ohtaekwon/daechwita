/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import Text from "_common/components/text";
import Grid from "_common/components/grid";

import { emoji } from "utils/constants";
import { media } from "utils/media";
import { theme } from "styles";

import TotalDataCharts from "./TotalDataCharts";
import MyDataCharts from "./MyDataCharts";

const Home = () => {
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.colors.lightBlue_50;
    return () => {
      document.body.style.backgroundColor = theme.colors.transparent;
    };
  }, []);

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
        <TotalDataCharts />
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
        <MyDataCharts schedules />
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
        <MyDataCharts resumes />
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
