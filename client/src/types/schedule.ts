export enum SchedulesEnum {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
  FINAL = "final",
}

export enum DnDAcceptKey {
  SCHEDULES = "schedules",
}

export type TimeType = {
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
  createdAt: TimeType;
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
  column: ColumnType;
  createdAt: TimeType;
  updatedAt?: TimeType;
}
