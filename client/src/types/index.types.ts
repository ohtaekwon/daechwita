import { theme } from "styles";

/**
 * 1. 칸반의 Column을 구성하는 타입
 */

/**
 * Todo 칸반의 Column의 상수를 설정합니다.
 *
 * 컬럼은 Todo, In Progress, Blocked, Completed로 구성됩니다.
 */
export enum ColumnType {
  TO_DO = "Todo",
  IN_PROGRESS = "In Progress",
  BLOCKED = "Blocked",
  COMPLETED = "Completed",
}

/**
 * Schedule 칸반의 Column의 상수를 설정합니다.
 *
 * 컬럼은 서류전형, 1차전형, 2차전형, 3차전형(최종발표)로 구성됩니다.
 */
export enum ScheduleType {
  DOCUMENT_ROUND = "document screening",
  ONE_ROUND = "first round",
  TWO_ROUND = "second round",
  THIRD_ROUND = "final pass",
}

export interface AllTasksModel {
  [ColumnType.TO_DO]: TaskModel[];
  [ColumnType.COMPLETED]: TaskModel[];
  [ColumnType.BLOCKED]: TaskModel[];
  [ColumnType.IN_PROGRESS]: TaskModel[];
}
export enum ItemType {
  /**
   * Column안의 Item의 상수를 설정합니다.
   */
  TASK = "Task",
}

/**
 * Todo컬럼안의 item의 타입을 설정합니다.
 *
 * id, title, column, color로 구성됩니다.
 *
 * color는 칸반 아이템의 배경색상을 나타냅니다.
 */

export interface TaskModel {
  /**
   * TaskModel의 id의 타입을 설정합니다.
   */
  id: string;
  /**
   * TaskModel의 content내용의 타입을 설정합니다.
   */
  title: string;
  /**
   * TaskModel의 column의 타입을 설정합니다.
   */
  column: ColumnType;
  /**
   * TaskModel의 배경 색상을 설정합니다.
   */
  color: keyof typeof theme.colors;
  /**
   * TaskModel의 text의 타입을 설정합니다.
   */
  text?: string;
}
export interface DragItem {
  index: number;
  id: TaskModel["id"];
  from: ColumnType;
}

type ApplyType = {
  department: string;
  company: string;
};
type CreatedAt = {
  seconds: number;
  nanoseconds: number;
};
export interface SchedulesType {
  id: string;
  uid: string;
  column: string;
  apply: ApplyType;
  text: string;
  title: string;
  createdAt: CreatedAt;
}

export interface DocumentsType {
  id: string;
  uid: string;
  apply: ApplyType;
  text: string;
  title: string;
  createdAt: CreatedAt;
  tag: string;
}
