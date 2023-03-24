import { CSSProperties } from "@emotion/serialize";
import { ApexOptions } from "apexcharts";
import { ElementType, HTMLAttributes } from "react";

export type chartType =
  | "line"
  | "area"
  | "bar"
  | "histogram"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "treemap"
  | "boxPlot"
  | "candlestick"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | undefined;

export interface ChartProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   * @default div
   */
  as?: ElementType;
}
export interface Props extends HTMLAttributes<HTMLDivElement>, ChartProps {
  series: ApexOptions["series"];
  type: chartType;
  options: ApexOptions;
  width?: string | number;
  height?: string | number;
}
