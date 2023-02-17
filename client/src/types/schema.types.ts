import { BadgeType } from "_common/components/badge/index.types";
import { ColumnType, ScheduleType } from "./index.types";

export const ColumnColorSchema: Record<ColumnType | ScheduleType, BadgeType> = {
  [ColumnType.TO_DO]: "gray",
  [ColumnType.IN_PROGRESS]: "blue",
  [ColumnType.BLOCKED]: "red",
  [ColumnType.COMPLETED]: "green",
  [ScheduleType.DOCUMENT_ROUND]: "yellow",
  [ScheduleType.ONE_ROUND]: "purple",
  [ScheduleType.TWO_ROUND]: "sky",
  [ScheduleType.THIRD_ROUND]: "indigo",
};
