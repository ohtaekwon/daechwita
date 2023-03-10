import { ResumesType } from "types/index.types";

/**
 * GET Resumes 데이터 정제
 * @param rowData getResume를 통해 반환된 Promise 값을 정제
 */
export const getResumesService = (rowData: { data: ResumesType[] }) => {
  return rowData.data.map(
    ({
      id,
      uid,
      imgUrl,
      apply,
      createdAt,
      documents,
      updatedAt,
    }: ResumesType) => {
      return {
        id,
        uid,
        imgUrl: imgUrl || process.env.PUBLIC_URL + "images/resume_alt_01.jpg",
        resumes: {
          apply,
          documents,
        },
        createdAt,
        updatedAt,
        tag: [
          ...documents.map((item) =>
            item.tag !== "태그를 입력해주세요." ? item.tag : undefined
          ),
        ],
      };
    }
  );
};

/**
 * GET Resumes 데이터 정제
 * @param rowData getResume를 통해 반환된 Promise 값을 정제
 * publishing이 True인 것만 반환하도록 한다.
 */
export const getOnlyPublishedResumesService = (rowData: {
  data: ResumesType[];
}) => {
  const newData = rowData.data.filter((item) => item.publishing) || [];
  return newData.map(
    ({
      id,
      uid,
      imgUrl,
      apply,
      createdAt,
      documents,
      updatedAt,
      publishing,
    }: ResumesType) => {
      return {
        id,
        uid,
        imgUrl: imgUrl || process.env.PUBLIC_URL + "images/resume_alt_01.jpg",
        resumes: {
          apply,
          documents,
        },
        createdAt,
        updatedAt,
        tag: [
          ...documents.map((item) =>
            item.tag !== "태그를 입력해주세요." ? item.tag : undefined
          ),
        ],
      };
    }
  );
};
