import { AxiosResponse } from "axios";
import { ElementType, HTMLAttributes } from "react";
import { UseMutateFunction } from "react-query";
import { TaskModel } from "types/index.types";
import { ColumnType, Schedule } from "types/schedule";

export interface CardProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   * @default div
   */
  as?: ElementType;
}
export interface TodoCardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardProps {
  onDropHover: (i: number, j: number) => void;
}

export interface ScheduleCardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardProps {
  index: number;
  column: ColumnType;
  data: Schedule;
  onUpdate: UseMutateFunction<
    | AxiosResponse<any, any>
    | {
        error: {
          code: number;
          message: string;
        };
      },
    unknown,
    {
      id: string;
      index: number;
      column: ColumnType;
      company: string;
      department: string;
    },
    null
  >;
  onDelete: UseMutateFunction<
    | AxiosResponse<unknown, any>
    | {
        error: {
          code: number;
          message: string;
        };
      },
    unknown,
    string,
    null
  >;
  onSwap: ({
    fromId,
    fromIndex,
    toIndex,
  }: {
    fromId: string;
    fromIndex: number;
    toIndex: number;
  }) => void;
  // onSwap: UseMutateFunction<
  //   [
  //     (
  //       | AxiosResponse<any, any>
  //       | {
  //           error: {
  //             code: number;
  //             message: string;
  //           };
  //         }
  //     ),
  //     (
  //       | AxiosResponse<any, any>
  //       | {
  //           error: {
  //             code: number;
  //             message: string;
  //           };
  //         }
  //     )
  //   ],
  //   unknown,
  //   {
  //     fromId: Schedule["id"];
  //     fromIndex: number;
  //     toId: Schedule["id"];
  //     toIndex: number;
  //   },
  //   unknown
  // >;
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
