import React from "react";
import { v4 as uuid } from "uuid";
import { QueryClient, useMutation } from "react-query";

import { createResume, deleteResume, updateResume } from "lib/apis/api/resumes";
import { ResumesType } from "types/index.types";
import { ItemList } from "./useItems";

type QueryKeys = {
  readonly RESUMES: (id?: string) => (string | undefined)[];
  readonly SCHEDULES: "schedules";
};

/**
 * @abstract Resumes 서버 데이터의 상태관리를 위한 훅
 * @description Resumes의 쿼리 데이터를 useMutation하여 CRUD를 하는 훅
 * @param queryClient 쿼리 클라이언트
 * @param QueryKeys 쿼리키
 * @return onCreate onDelete onUpdate onPublishing
 */

function useResumes(queryClient: QueryClient, QueryKeys: QueryKeys) {
  const { mutate: onCreate } = useMutation(
    () =>
      createResume({
        imgUrl: "",
        apply: {
          company: "",
          department: "",
        },
        documents: [
          {
            id: uuid(),
            title: "",
            text: "",
            tag: "",
          },
        ],
        publishing: false,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QueryKeys.RESUMES(), {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );
  const { mutate: onUpdate } = useMutation(
    ({
      id,
      company,
      department,
      documents,
    }: {
      id: string;
      company: string;
      department: string;
      documents: ItemList["documents"];
    }) =>
      /**
       * @description resume REST API update를 위한 PUT request
       * @param id resume의 id
       * @param body 업데이트할 내용의 body
       */
      updateResume(id, {
        apply: {
          company,
          department,
        },
        documents,
      }),
    {
      onSuccess: async (updateData: unknown = {}, variables, ctx) => {
        await queryClient.invalidateQueries(QueryKeys.RESUMES(), {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  const { mutate: onPublish } = useMutation(
    ({ id, publishing }: { id: string; publishing: boolean }) =>
      /**
       * @description resume REST API update를 위한 PUT request
       * @default id resume의 id값
       * @default body 업데이트할 내용의 body
       * @example publishing의 기본값 false에서 true를 PUT요청
       */
      updateResume(id, {
        publishing,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QueryKeys.RESUMES(), {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  const { mutate: onDelete } = useMutation((id: string) => deleteResume(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(QueryKeys.RESUMES());
      const response = queryClient.getQueriesData(QueryKeys.RESUMES());
      const [key, resumesData] = response[0];

      if (!resumesData) return null;

      const targetIndex = (resumesData as ResumesType[]).findIndex(
        (item) => item.id === id
      );

      if (!resumesData || targetIndex === undefined || targetIndex < 0) return;
      const copyResumes = [...(resumesData as ResumesType[])];
      copyResumes.splice(targetIndex, 1);
      queryClient.setQueryData(QueryKeys.RESUMES(), copyResumes);
    },
    onSuccess: async (updateData, variables, ctx) => {
      const response = queryClient.getQueriesData(QueryKeys.RESUMES());
      const [key, resumesData] = response[0];
      if (!resumesData) return null;

      const targetIndex = (resumesData as ResumesType[]).findIndex(
        (item) => item.id === variables
      );
      if (!resumesData || targetIndex === undefined || targetIndex < 0) return;
      const copyResumes = [...(resumesData as ResumesType[])];
      copyResumes.splice(targetIndex, 1);
      queryClient.setQueryData(QueryKeys.RESUMES(), copyResumes);
    },
  });

  return { onCreate, onUpdate, onPublish, onDelete };
}
export default useResumes;

// onMutate: async (mutateData) => {
//   const { id, company, department, documents } = mutateData;
//   await queryClient.cancelQueries(QueryKeys.RESUMES());
//   const response = queryClient.getQueriesData(QueryKeys.RESUMES()) || {};
//   const [key, resumesData] = response[0];

//   if (!resumesData) return null;

//   const targetIndex = (resumesData as ResumesResponse[]).findIndex(
//     (data) => data.id === id
//   );

//   if (!resumesData || targetIndex === undefined || targetIndex < 0) {
//     return;
//   }
//   const copyResumes = [...(resumesData as ResumesResponse[])];

//   const newData: Pick<ResumesResponse, "resumes"> = {
//     resumes: {
//       apply: {
//         company,
//         department,
//       },
//       documents,
//     },
//   };
//   copyResumes.splice(targetIndex, 1, {
//     ...copyResumes[targetIndex],
//     // newData
//   });

//   console.log("resumesData", response);
//   console.log("mutateData", mutateData);
// },
