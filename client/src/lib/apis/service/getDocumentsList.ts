import { DocumentsType } from "types/index.types";

/**
 * GET Documents의 데이터 정제
 */
export const getDocumentsList = (rowData: DocumentsType[]) => {
  return rowData.map(
    ({
      id,
      uid,
      apply: { department, company },
      text,
      title,
      tag,
      createdAt: { seconds, nanoseconds },
    }: DocumentsType) => {
      return {
        id,
        uid,
        department,
        company,
        tag,
        text,
        title,
        seconds,
        nanoseconds,
      };
    }
  );
};
