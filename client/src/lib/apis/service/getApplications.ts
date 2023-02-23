import { ApplicationType, DocumentsType } from "types/index.types";

/**
 * GET Documents의 데이터 정제
 */
export const getApplications = (rowData: ApplicationType[]) => {
  return rowData.map(
    ({
      uid,
      apply: { department, company },
      createdAt: { seconds, nanoseconds },
      documents,
    }: ApplicationType) => {
      return {
        uid,
        department,
        company,
        documents,
        seconds,
        nanoseconds,
      };
    }
  );
};
