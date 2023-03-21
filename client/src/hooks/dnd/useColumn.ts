import React from "react";
import { UseMutateFunction, useMutation } from "react-query";
import { getClient, QueryKeysType } from "queryClient";

import {
  createSchedule,
  deleteSchedules,
  updateSchedules,
} from "lib/apis/api/schedules";
import {
  ColumnType,
  OriginScheduleType,
  Schedule,
  SchedulesType,
  TimeType,
} from "types/schedule";
import { throttle } from "utils/helpers";
import { AxiosResponse } from "axios";

/**
 * @description useMutation을 사용하여 미리 UI부터 변화시켜주는 낙관적 업데이트(optimistic update)를 구현하는 Custom Hook
 *
 * @param queryKey 쿼리 키 - schedules
 * @param column 컬럼명 - first / second / third / final
 */
function useColumn(queryKey: QueryKeysType, column: ColumnType) {
  const queryClient = getClient();

  /**
   * @description onCreate - POST요청을 하기전에 서버 데이터의 캐시에서 미리 추가된 아이템을 반영하여 더 나은 UI를 구현를 구현하는 Custom Hook
   *
   * @param index 추가할 컬럼 아이템의 index값
   * @param column 추가할 해당 컬럼의 컬럼명
   * @default column 해당 컬럼
   * 
   * @param company 추가할 해당 컬럼의 회사의 회사명
   * @default '회사명을 입력해주세요'

   * @param department 추가할 해당 부서의 부서명 
   * @default '부서명을 입력해주세요'
   */
  const { mutate: onCreate } = useMutation(
    ({
      index,
      column,
      company,
      department,
    }: {
      column: string;
      index: number;
      company: string;
      department: string;
    }) =>
      createSchedule({
        column,
        index,
        application: {
          company,
          department,
        },
      }),
    {
      onMutate: async (aa) => {
        // await queryClient.invalidateQueries(queryKey, {
        //   exact: false,
        //   refetchInactive: true,
        // });
      },
      onSuccess: async (addData: unknown = {}, variables, ctx) => {
        const { id, uid, index, createdAt, column, application } =
          addData! as OriginScheduleType;

        if (!addData) {
          await queryClient.invalidateQueries(queryKey, {
            exact: false,
            refetchInactive: true,
          });
        }
        await queryClient.cancelQueries(queryKey);
        const response = queryClient.getQueriesData(queryKey) || {};
        const [key, schedulesData] = response[0];

        if (!schedulesData) return null;
        let copySchedules = { ...(schedulesData as SchedulesType) };
        copySchedules[column].push({
          column,
          company: application.company,
          department: application.department,
          index,
          createdAt,
          id: id,
          uid: uid,
        });
        copySchedules = {
          ...copySchedules,
          [column]: copySchedules[column].sort((a, b) => b.index - a.index),
        };
        queryClient.setQueryData(queryKey, copySchedules);
      },
    }
  );

  /**
   * @description onUpdate - PUT요청을 하기전에 서버 데이터의 캐시를 미리 변화시켜 더 나은 UI를 구현
   * 
   * @param id 수정할 해당 컬럼 아이템의 id
   * @default id 해당 컬럼의 아이디

   * @param index 수정할 해당 컬럼 아이템의 index
   * @default index Drag & Drop으로 변경된 index

   * @param column 수정할 해당 컬럼의 컬럼명
   * @default column Drag & Drop으로 변경된 column

   * @param company 수정할 해당 컬럼의 회사의 회사명
   * @default company 해당 컬럼 아이템의 회사명

   * @param department 수정할 해당 부서의 부서명
   * @default department 해당 컬럼 아이템의 부서명
   */
  const { mutate: onUpdate } = useMutation(
    ({
      id,
      index,
      column,
      company,
      department,
      createdAt,
    }: {
      id: string;
      index: number;
      column: ColumnType;
      company: string;
      department: string;
      createdAt: TimeType;
    }) =>
      updateSchedules(id, {
        column,
        index,
        application: {
          company,
          department,
        },
        createdAt,
      }),
    {
      onMutate: async (mutatedData) => {
        const {
          column: newColumn,
          company,
          department,
          id,
          index,
          createdAt,
        } = mutatedData;
        await queryClient.cancelQueries(queryKey);
        const response = queryClient.getQueriesData(queryKey) || {};
        const [key, schedulesData] = response[0];

        if (!schedulesData) return null;

        const targetIndex = (schedulesData as SchedulesType)[column].findIndex(
          (item) => item.id === id
        );

        if (!schedulesData || targetIndex === undefined || targetIndex < 0)
          return;

        const copySchedules = { ...(schedulesData as SchedulesType) };
        copySchedules[column].splice(targetIndex, 1, {
          ...copySchedules[column][targetIndex],
          column: newColumn,
          company,
          department,
          index,
        });
        queryClient.setQueryData(queryKey, copySchedules);
      },
      onSuccess: async (updateData, variables, ctx) => {
        const { column: newColumn, company, department, id, index } = variables;

        await queryClient.cancelQueries(queryKey);
        const response = queryClient.getQueriesData(queryKey) || {};
        const [key, schedulesData] = response[0];

        if (!schedulesData) return null;
        const targetIndex = (schedulesData as SchedulesType)[column].findIndex(
          (item) => item.id === id
        );
        if (!schedulesData || targetIndex === undefined || targetIndex < 0)
          return;

        const copySchedules = { ...(schedulesData as SchedulesType) };
        copySchedules[column].splice(targetIndex, 1, {
          ...copySchedules[column][targetIndex],
          column: newColumn,
          company,
          department,
          index,
        });
        queryClient.setQueryData(queryKey, copySchedules);
      },
    }
  );
  /**
   * @description onDelete - DELETE요청을 하기전에 서버 데이터의 캐시를 미리 삭제를 반영하여 더 나은 UI를 구현
   * @param id 삭제할 해당 컬럼 아이템의 id
   * @default id 삭제할 컬럼 아이템의 아이디 값
   */
  const { mutate: onDelete } = useMutation(
    (id: string) => deleteSchedules(id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(queryKey);
        const response = queryClient.getQueriesData(queryKey) || {
          data: [],
        };
        const [key, schedulesData] = response[0];

        if (!schedulesData) return null;

        const targetIndex = (schedulesData as SchedulesType)[column].findIndex(
          (item) => item.id === id
        );

        if (!schedulesData || targetIndex === undefined || targetIndex < 0)
          return;

        const copySchedules = { ...schedulesData };
        (copySchedules as SchedulesType)[column].splice(targetIndex, 1);
        queryClient.setQueryData(queryKey, copySchedules);
      },
      onSuccess: async (updateData, variables, ctx) => {
        const response = queryClient.getQueriesData(queryKey) || {
          data: [],
        };
        const [key, schedulesData] = response[0];
        const newData = schedulesData as SchedulesType;

        const targetIndex = newData[column].findIndex(
          (item) => item.id === variables
        );
        if (!schedulesData || targetIndex === undefined || targetIndex < 0)
          return;

        const copySchedules = { ...newData };
        copySchedules[column].splice(targetIndex, 1);

        queryClient.setQueryData(queryKey, { copySchedules });
      },
    }
  );

  const { mutate: onDrop } = useMutation(
    ({ id }: { id: Schedule["id"] }) =>
      updateSchedules(id, {
        id,
        column,
        index: Date.now() + Math.random() * 2,
      }),
    {
      onMutate: async () => {
        queryClient.invalidateQueries(queryKey, {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  const { mutate: onSwap } = useMutation(
    async ({
      fromId,
      fromIndex,
      toIndex,
    }: {
      fromId: Schedule["id"];
      fromIndex: number;
      toIndex: number;
    }) => {
      if (fromIndex > toIndex) {
        // await throttle(() => console.log("대기"), 1500);
        console.log("아래로 이동");
        return updateSchedules(fromId, { index: toIndex - 1 });
      } else {
        // await throttle(() => console.log("대기"), 1500);
        console.log("위로 이동");
        return updateSchedules(fromId, { index: toIndex + 1 });
      }
    },
    {
      onMutate: async () => {
        await throttle(() => console.log("대기", 1500));
        queryClient.invalidateQueries(queryKey, {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  return { onCreate, onUpdate, onDelete, onDrop, onSwap };
}
export default useColumn;

type Error = {
  error: { code: number; message: string };
};
type Response = AxiosResponse<any, any> | Error;

export type OnCreate = UseMutateFunction<
  Schedule | undefined,
  unknown,
  {
    column: string;
    index: number;
    company: string;
    department: string;
    createdAt: TimeType;
  },
  void
>;

export type OnDrop = UseMutateFunction<
  Response,
  unknown,
  { id: string },
  unknown
>;

export type OnUpdate = UseMutateFunction<
  Response,
  unknown,
  {
    id: string;
    index: number;
    column: ColumnType;
    company: string;
    department: string;
    createdAt: TimeType;
  },
  null
>;

export type OnDelete = UseMutateFunction<Response, unknown, string, null>;

export type OnSwap = UseMutateFunction<
  Response,
  unknown,
  { fromId: Schedule["id"]; fromIndex: number; toIndex: number },
  unknown
>;
