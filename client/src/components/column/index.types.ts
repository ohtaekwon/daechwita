import React, { ElementType } from "react";
import { HTMLAttributes } from "react";

export enum ColumnType {
  TO_DO = "Todo",
  IN_PROGRESS = "In Progress",
  BLOCKED = "Blocked",
  COMPLETED = "Completed",
}
export enum ItemType {
  TASK = "Task",
}
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
  column?: any;
  columnColorSchema?: any;
  type?: string;
}
