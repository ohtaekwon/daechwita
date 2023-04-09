import React from "react";
import { v4 as uuid } from "uuid";
import { QueryClient, useMutation } from "react-query";

import { createResume, deleteResume, updateResume } from "lib/apis/api/resumes";
import { Resume, ResumesType } from "types/index.types";
import { ItemList } from "./useItems";
import { useRecoilState } from "recoil";
import { resumesIdAtom } from "store/atoms";
import { QueryKeysType } from "queryClient";

/**
 * @description Resumes 서버 데이터의 상태관리를 위한 훅
 * @description Resumes의 쿼리 데이터를 useMutation하여 CRUD를 하는 훅
 * @param queryClient 쿼리 클라이언트
 * @param QueryKeys 쿼리키
 * @return onCreate onDelete onUpdate onPublishing
 */

function useResumes(queryClient: QueryClient, QueryKeys: QueryKeysType) {
  const [resumeId, setResumeId] = useRecoilState(resumesIdAtom);

  const { mutate: onCreate } = useMutation(
    ({
      imgUrl = "",
      apply,
      documents,
      publishing,
    }: {
      imgUrl?: string;
      apply: {
        company: string;
        department: string;
      };
      documents: ItemList["documents"];
      publishing: boolean;
    }) =>
      createResume({
        imgUrl,
        apply,
        documents,
        publishing,
      }),
    {
      onSuccess: async (updateData, variables) => {
        await queryClient.invalidateQueries(QueryKeys.RESUMES(), {
          exact: false,
          refetchInactive: true,
        });
        setResumeId((updateData as Resume).id);
      },
    }
  );
  const { mutate: onUpdate } = useMutation(
    ({
      id,
      imgUrl,
      company,
      department,
      documents,
    }: {
      id: string;
      imgUrl?: string;
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
        imgUrl,
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
      // await queryClient.cancelQueries(QueryKeys.RESUMES());
      // const response = queryClient.getQueriesData(QueryKeys.RESUMES());
      // const [key, resumesData] = response[0];
      // if (!resumesData) return null;
      // const targetIndex = (resumesData as ResumesType[]).findIndex(
      //   (item) => item.id === id
      // );
      // if (!resumesData || targetIndex === undefined || targetIndex < 0) return;
      // const copyResumes = [...(resumesData as ResumesType[])];
      // copyResumes.splice(targetIndex, 1);
      // queryClient.setQueryData(QueryKeys.RESUMES(), copyResumes);
    },
    onSuccess: async (updateData, variables, ctx) => {
      await queryClient.invalidateQueries(QueryKeys.RESUMES(), {
        exact: false,
        refetchInactive: true,
      });
      // const response = queryClient.getQueriesData(QueryKeys.RESUMES());
      // const [key, resumesData] = response[0];
      // if (!resumesData) return null;

      // const targetIndex = (resumesData as ResumesType[]).findIndex(
      //   (item) => item.id === variables
      // );
      // if (!resumesData || targetIndex === undefined || targetIndex < 0) return;
      // const copyResumes = [...(resumesData as ResumesType[])];
      // copyResumes.splice(targetIndex, 1);
      // queryClient.setQueryData(QueryKeys.RESUMES(), copyResumes);
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
// },
