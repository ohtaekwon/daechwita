import React, { ElementType } from "react";
import { HTMLAttributes } from "react";
import { ColumnType, ScheduleType } from "types/index.types";
import { BadgeType } from "_common/components/badge/index.types";

export interface ColumnProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
}
export interface Props extends HTMLAttributes<HTMLDivElement>, ColumnProps {
  children?: React.ReactNode;
  column: ColumnType;
  columnColorSchema?: Record<ColumnType | ScheduleType, BadgeType>;
  type?: string;
  key: string;
}
