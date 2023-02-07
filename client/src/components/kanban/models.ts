import { theme } from "styles";
import { ColumnType } from "./enums";

export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;

  /**
   * TaskModel의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  color: keyof typeof theme.colors;
}
