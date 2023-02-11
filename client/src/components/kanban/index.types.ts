import { theme } from "styles";

export enum ColumnType {
  TO_DO = "Todo",
  IN_PROGRESS = "In Progress",
  BLOCKED = "Blocked",
  COMPLETED = "Completed",
}
export enum ItemType {
  TASK = "Task",
}

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
  color: keyof typeof theme.colors | any;
}
export interface DragItem {
  index: number;
  id: TaskModel["id"];
  from: ColumnType;
}
