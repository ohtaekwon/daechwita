import React from "react";
import ApexChart from "react-apexcharts";
import { allOptions, donutOptions } from "./index.options";
import { Props, SubOption } from "./index.types";

import Box from "_common/components/box";
import Text from "_common/components/text";

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
      variant="gray_200_border"
      width="100%"
      height="500px"
      padding="1rem"
      marginTop={20}
      marginBottom={10}
    >
      {!series && (
        <Text
          fontSize="xl"
          fontWeight={700}
          textAlign="center"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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
