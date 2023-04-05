import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/methods";

import { handleError } from "../utils/helpers";
import { Resume } from "types/index.types";
import { createResume, updateResume } from "./resumes";

export const basePath = "/api/v1/resumes";

/**
 * Temp Save Resume 임시 저장을 위한 REST API
 */

export const tempSave = async (
  id: string | undefined,
  payload: unknown = {}
) => {
  try {
    // id가 없을 경우에는 새롭게 RESUME를 만든다.
    if (!id) {
      const response = createResume(payload);
      return response;
    } else {
      // id가 있을 경우 기존의 RESUME를 업데이트
      const response = updateResume(id, payload);
      return response;
    }
  } catch (error) {
    console.error(`임시 저장을 하는 도중 에러가 발샏하였습니다.`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
