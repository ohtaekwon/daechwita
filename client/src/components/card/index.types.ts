import { ElementType, HTMLAttributes } from "react";
import { TaskModel } from "types/index.types";

export interface CardProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
}
export interface Props extends HTMLAttributes<HTMLDivElement>, CardProps {
  /**
   * Card Item의 인덱스의 타입을 설정합니다.
   */
  index: number;
  /**
   * Card Item의 내부 컨텐츠의 모델을 설정합니다.
   */
  task: TaskModel;
  /**
   * 삭제 기능을 담당할 함수의 타입을 설정합니다.
   */
  onDelete: (id: TaskModel["id"]) => void;
  /**
   * 업데이트 기능을 담당할 함수의 타입을 설정합니다.
   */
  onUpdate: (id: TaskModel["id"], updatedTask: TaskModel) => void;
  /**
   * 드랍 기능을 담당할 함수의 타입을 설정합니다.
   */
  onDropHover: (i: number, j: number) => void;
  children?: React.ReactNode;
}
