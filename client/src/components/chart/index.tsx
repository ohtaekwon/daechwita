import React from "react";
import ApexChart from "react-apexcharts";
import Box from "_common/components/box";
import { Props } from "./index.types";

const Chart = ({
  type,
  series,
  options,
  width = "500px",
  height = "500px",
}: React.PropsWithChildren<Props>) => {
  return (
    <Box
      variant="gray_200_border"
      width="100%"
      height="500px"
      padding="1rem"
      marginTop={20}
      marginBottom={10}
    >
      <ApexChart
        type={type}
        series={series}
        options={options}
        width={width}
        height={height}
      />
    </Box>
  );
};
export default Chart;
