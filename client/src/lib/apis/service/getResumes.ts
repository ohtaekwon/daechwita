import { ResumesServiceType } from "types/resumes";
import { randomButtonColor } from "utils/helpers";

/**
 * GET Resumes 데이터 정제
 * @param rowData getResume를 통해 반환된 Promise 값을 정제
 */
export const getResumesService = (rowData: { data: ResumesServiceType[] }) => {
  const newData = rowData.data.sort(
    (a, b) => b.updatedAt?.seconds! - a.updatedAt?.seconds!
  );
  return newData?.map(
    ({
      id,
      uid,
      imgUrl,
      apply,
      createdAt,
      documents,
      updatedAt,
    }: ResumesServiceType) => {
      return {
        id,
        uid,
        imgUrl: imgUrl || `${process.env.PUBLIC_URL}/images/resume_alt_01.jpg`,
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
        colors: [...documents.map((item) => randomButtonColor())],
      };
    }
  );
};

/**
 * GET Resumes 데이터 정제
 * @param rowData getResume를 통해 반환된 Promise 값을 정제
 * publishing이 False인 것만 반환하도록 한다.
 */
export const getTempResumesService = (rowData: {
  data: ResumesServiceType[];
}) => {
  const newData =
    rowData.data.filter((item) => item.publishing === false) || [];
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
    }: ResumesServiceType) => {
      return {
        id,
        uid,
        imgUrl: imgUrl || `${process.env.PUBLIC_URL}/images/noimg.jpg`,
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
        colors: [...documents.map((item) => randomButtonColor())],
      };
    }
  );
};
