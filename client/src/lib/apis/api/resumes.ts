import { authInstance } from "../utils/instance";
import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/methods";
import { handleError } from "../utils/helpers";
import { Resume } from "types/index.types";

export const basePath = "/resumes";

export const resumeApiRoutes = {
  getResumeByResumeId: (resumeId: string) => `${basePath}/${resumeId}`,
  getLatestResumeByQuery: () => `${basePath}?latest=true`,
  getPublishedResume: (pageParam = "") =>
    `${basePath}?publishing=true&page=${pageParam}`,
  updateResumeByResumeId: (resumeId: string) => `${basePath}/${resumeId}`,
  deleteResumeByResumeId: (resumeId: string) => `${basePath}/${resumeId}`,
};

/**
 * GET resume
 *
 * @param resumeId 해당 id를 가진 자기소개서만 가져온다.
 */
export const getResume = async (resumeId: string) => {
  try {
    const apiRoute = resumeApiRoutes.getResumeByResumeId(resumeId);
    console.info(`id: ${resumeId}가진 자기소개서를 가져오는 중 입니다...`);
    const { data } = await requestGet(apiRoute);
    console.info(`${resumeId}를 가진 자기소개서가 성공적으로 반환되었습니다!`);
    return { data };
  } catch (error) {
    console.error(`id: ${resumeId}를 가져오는 도중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * GET resume
 *
 * @param resumeId 해당 id를 가진 자기소개서만 가져온다.
 */
export const getLatestResume = async () => {
  try {
    const apiRoute = resumeApiRoutes.getLatestResumeByQuery();
    console.info(`가장 최근의 자기소개서를 가져오는 중 입니다...`);
    const { data } = await requestGet(String(apiRoute));
    console.info(`가장 최근 작성한 자기소개서가 성공적으로 반환되었습니다!`);
    return { data };
  } catch (error) {
    console.error(`자기소개서를 가져오는 도중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * GET All resumes
 */
export const getAllResumes = async ({ pageParam = "" }) => {
  try {
    const apiRoute = resumeApiRoutes.getPublishedResume(pageParam);
    console.info(`자기소개서 전부를 가져오는 중 입니다...`);
    const { data } = await requestGet(apiRoute);
    console.info(`자기소개서가 성공적으로 반환되었습니다!`);
    return { data } as any;
  } catch (error) {
    console.error(`자기소개서를 가져오는 도중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * POST resumes
 *
 * @param payload
 */
export const createResume = async (payload: unknown = {}) => {
  try {
    console.info("자기소개서를 작성성 중 입니다...");
    const { data }: { data: Resume } = await requestPost(basePath, payload);
    console.info(`임시 자기소개서 ${data?.id!}가 반환되었습니다!`);
    return data as Resume;
  } catch (error) {
    console.error(`자기소개서를 작성하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * PUT resumes
 *
 * @param resumeId
 * @param payload
 */
export const updateResume = async (resumeId: string, payload: unknown = {}) => {
  try {
    const apiRoute = resumeApiRoutes.updateResumeByResumeId(resumeId);
    console.info(`id: ${resumeId}가진 자기소개서를 저장 중 입니다...`);
    const response = await requestPut(apiRoute, payload);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error(`자기소개서를 저장하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * DELETE resumes
 *
 * @param resumeId
 */
export const deleteResume = async (resumeId: string) => {
  try {
    const apiRoute = resumeApiRoutes.deleteResumeByResumeId(resumeId);
    console.info(`id: ${resumeId}가진 자기소개서를 삭제 중 입니다...`);
    const response = await requestDelete(apiRoute);
    return response;
  } catch (error) {
    console.error(`자기소개서를 삭제하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
