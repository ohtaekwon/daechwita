import React, { ElementType } from "react";
import { HTMLAttributes } from "react";
import { ColumnType, Schedule } from "types/schedule";
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
  addBtn?: boolean;
  column: ColumnType;
  data: Schedule[] | undefined;
}
