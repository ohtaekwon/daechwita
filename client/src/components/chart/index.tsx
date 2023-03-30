import React from "react";
import { css } from "@emotion/react";

import ApexChart from "react-apexcharts";
import { allOptions, donutOptions } from "./index.options";
import { Props, SubOption } from "./index.types";

import Box from "_common/components/box";
import Text from "_common/components/text";
import { media } from "utils/media";

const Chart = ({
  type,
  series,
  options,
  subOption = {},
  width = "100%",
  height = "100%",
}: React.PropsWithChildren<Props>) => {
  const selectOptions = (type: Props["type"], subOption: SubOption = {}) => {
    switch (type) {
      case "treemap":
        return allOptions.treemapOptions(subOption);
      case "bar":
        return allOptions.barOption(subOption);
      case "donut":
        return allOptions.donutOptions(subOption);
      case "polarArea":
        return allOptions.polarAreaOption(subOption);
    }
    return allOptions.barOption(subOption);
  };

  return (
    <Box
      variant="chart_border"
      padding="1rem"
      width="1280px"
      height="500px"
      marginTop={20}
      marginBottom={10}
      css={css`
        padding: 1rem 0;
      `}
    >
      {!series && (
        <Text
          fontSize="xl"
          fontWeight={700}
          textAlign="center"
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          "현재 작성 중인 이력서 및 입사 지원 현황이 없습니다."
        </Text>
      )}
      {series && (
        <ApexChart
          type={type}
          series={series}
          options={selectOptions(type, subOption)}
          width={width}
          height={height}
        />
      )}
    </Box>
  );
};
export default Chart;

/* @media screen and (min-width: 320px) {
    width: 300px;
  }
  @media screen and (min-width: 420px) {
    width: 400px;
  }
  @media screen and (min-width: 520px) {
    width: 500px;
  }
  @media screen and (min-width: 620px) {
    width: 600px;
  }
  @media screen and (min-width: 720px) {
    width: 700px;
  }
  @media screen and (min-width: 820px) {
    width: 800px;
  }
  @media screen and (min-width: 920px) {
    width: 900px;
  }
  @media screen and (min-width: 1020px) {
    width: 1000px;
  }
  @media screen and (min-width: 1120px) {
    width: 1100px;
  }
  @media screen and (min-width: 1220px) {
    width: 1200px;
  }
  @media screen and (min-width: 1280px) {
    width: 100%;
  } */
