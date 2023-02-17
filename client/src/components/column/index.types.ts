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
export interface CommonProps
  extends HTMLAttributes<HTMLDivElement>,
    ColumnProps {
  children?: React.ReactNode;
  type?: string;
}

export interface LocalStorageColumnProps extends CommonProps {
  column: ColumnType;
  columnColorSchema?: Record<ColumnType, BadgeType>;
  localStorageKey: string;
}
export interface FirebaseColumnProps extends CommonProps {
  column: ScheduleType;
  columnColorSchema?: Record<ScheduleType, BadgeType>;
}
