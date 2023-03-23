import React from "react";
import ApexChart from "react-apexcharts";
import { Props } from "./index.types";

const Chart = ({ type, series, options }: React.PropsWithChildren<Props>) => {
  return (
    <>
      <ApexChart type={type} series={series} options={options} />
    </>
  );
};
export default Chart;
