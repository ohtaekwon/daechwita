import { handleError } from "../utils/helpers";
import { authInstance } from "../utils/instance";
import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/methods";

export const basePath = "/files";

/**
 * POST Image File
 *
 * @param payload
 */
export const postImageFile = async (payload: unknown = {}, config = {}) => {
  try {
    console.info("이미지를 전송 중 입니다...");
    const response = await requestPost(basePath, payload, config);
    console.info("data", response);
    // console.info(`이미지의 아이디가 반환되었습니다. ${data?.id!}가 반환되었습니다!`);

    return response;
  } catch (error) {
    console.error(`자기소개서를 작성하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
