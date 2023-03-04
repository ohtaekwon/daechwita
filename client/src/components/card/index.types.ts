import { ElementType, HTMLAttributes } from "react";
import { SchedulesType, TaskModel } from "types/index.types";

export interface CardProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
}
export interface TodoCardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardProps {
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

export interface ScheduleCardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardProps {
  /**
   * Card Item의 인덱스의 타입을 설정합니다.
   */
  index: number;
  /**
   * Card Item의 내부 컨텐츠의 모델을 설정합니다.
   */

  task: SchedulesType;
  children?: React.ReactNode;
}

type TimeType = {
  seconds: number;
  nanoseconds: number;
};

export interface ResumeCardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardProps {
  /**
   * Card Item의 내부 컨텐츠의 모델의 타입을 설정합니다.
   */
  id: string;
  createdAt: TimeType;
  uid: string;
  updatedAt: null | TimeType;
  resumes: {
    apply: {
      company: string;
      department: string;
    };
    documents: {
      id: string;
      tag: string;
      text: string;
      title: string;
    }[];
  };
  tag: (string | undefined)[];
  children?: React.ReactNode;
}
