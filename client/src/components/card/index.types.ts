import { ElementType, HTMLAttributes } from "react";
import { ColumnType, Schedule, TimeType } from "types/schedule";
import { OnDelete, OnSwap, OnUpdate } from "hooks/useColumn";

export interface CardProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   * @default div
   */
  as?: ElementType;
}
export interface ScheduleCardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardProps {
  index: number;
  column: ColumnType;
  data: Schedule;
  onUpdate: OnUpdate;
  onDelete: OnDelete;
  onSwap: OnSwap;
}

export interface ResumeCardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardProps {
  /**
   * Card Item의 내부 컨텐츠의 모델의 타입을 설정합니다.
   */
  id: string;
  imgUrl: string;
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
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
