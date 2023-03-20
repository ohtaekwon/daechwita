import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export enum ScheduleColumnEnum {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
  FINAL = "final",
}

export enum DnDAcceptKey {
  SCHEDULES = "schedules",
}

type TimeType = {
  seconds: number;
  nanoseconds: number;
};
export type ColumnType = "first" | "second" | "third" | "final";

export interface Schedule {
  id: string;
  index: number;
  uid: string;
  company: string;
  department: string;
  column: ColumnType;
}

export interface SchedulesType {
  first: Schedule[];
  second: Schedule[];
  third: Schedule[];
  final: Schedule[];
}

export interface DragItem {
  index: number;
  id: Schedule["id"];
  from: ColumnType;
}

export interface OriginScheduleType {
  id: string;
  index: number;
  uid: string;
  application: {
    company: string;
    department: string;
  };
  colum: ColumnType;
  updatedAt: TimeType;
  createdAt: TimeType;
}
