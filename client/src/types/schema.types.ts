import { BadgeType } from "_common/components/badge/index.types";
import { ScheduleType } from "./index.types";

export const ColumnColorSchema: Record<ScheduleType, BadgeType> = {
  [ScheduleType.DOCUMENT_ROUND]: "yellow",
  [ScheduleType.ONE_ROUND]: "purple",
  [ScheduleType.TWO_ROUND]: "sky",
  [ScheduleType.THIRD_ROUND]: "indigo",
};
