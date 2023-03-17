import { BadgeType } from "_common/components/badge/index.types";
import { ScheduleType } from "./index.types";

export const ColumnColorSchema: Record<ScheduleType, BadgeType> = {
  [ScheduleType.FIRST]: "yellow",
  [ScheduleType.SECOND]: "purple",
  [ScheduleType.THIRD]: "sky",
  [ScheduleType.FINAL]: "indigo",
};
