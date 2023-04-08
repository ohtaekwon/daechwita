import React from "react";
import { css } from "@emotion/react";

import ApexChart from "react-apexcharts";
import { allOptions } from "./index.options";
import { Props, SubOption } from "./index.types";

import Box from "_common/components/Box";
import Text from "_common/components/Text";
import Skeleton from "components/Skeleton";

const Chart = ({
  type,
  series,
  subOption = {},
  width = "100%",
  height = "100%",
  loading,
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
    <>
      {loading && <Skeleton height="500px" width="100%" />}
      {!loading && (
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
      )}
    </>
  );
};
export default Chart;
