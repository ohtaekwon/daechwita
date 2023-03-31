import { ElementType, HTMLAttributes } from "react";
import { ColumnType, Schedule, TimeType } from "types/schedule";
import { OnDelete, OnSwap, OnUpdate } from "hooks/dnd/useColumn";
import { color } from "utils/helpers";

export interface ScheduleCardProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  column: ColumnType;
  data: Schedule;
  onUpdate: OnUpdate;
  onDelete: OnDelete;
  onSwap: OnSwap;
}

export interface CommonCard extends HTMLAttributes<HTMLDivElement> {
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
  colors: color[];
}

export interface ResumeCardProps extends CommonCard {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TempCardProps extends CommonCard {}
