import { authInstance } from "../utils/instance";

import { handleError } from "../utils/helpers";
import { requestGet } from "../utils/methods";

const dict = {
  resumes: "자기소개서",
  schedules: "입사 지원현황",
};

type SchedulesCategory = "column" | "company" | "department" | "";
type ResumesCategory = "tag" | "department" | "company" | "";

const BASE_PATH_TOTAL = "/api/v1/total";
const BASE_PATH_USER = "/api/v1/user";

export const allServerDataApiRoutes = {
  // 전체 데이터
  getTotalSchedulesByCategory: (category: SchedulesCategory) =>
    `${BASE_PATH_TOTAL}/schedules?category=${category}`,
  getTotalResumesByCategory: (category: ResumesCategory) =>
    `${BASE_PATH_TOTAL}/resumes?category=${category}`,
  // 마이데이터
  getUserSchedulesByCategory: (category: SchedulesCategory) =>
    `${BASE_PATH_USER}/schedules?category=${category}`,
  getUserResumesByCategory: ({
    category,
    publishing,
  }: {
    category: ResumesCategory;
    publishing: boolean;
  }) =>
    `${BASE_PATH_USER}/resumes?category=${category}&publishing=${publishing}`,
  getUserResumesAll: () => `${BASE_PATH_USER}/resumes/all`,
};

/**
 *
 * @param query
 * @returns
 */

export const getTotalSchedulesByCategory = async (
  category: SchedulesCategory
) => {
  try {
    console.info(`전체 입사지원형황 데이터를 가져오는 중입니다.`);
    const apiRoute =
      allServerDataApiRoutes.getTotalSchedulesByCategory(category);
    const { data } = await requestGet(authInstance, apiRoute);
    return data;
  } catch (error) {
    console.error(
      "전체 입사지원현황 데이터를 가져오는 도중 에러가 발생하였습니다."
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getTotalResumesByCategory = async (category: ResumesCategory) => {
  try {
    console.info(`전체 자기소개 데이터를 가져오는 중입니다.`);
    const apiRoute = allServerDataApiRoutes.getTotalResumesByCategory(category);
    const { data } = await requestGet(authInstance, apiRoute);
    return data;
  } catch (error) {
    console.error(
      "전체 자기소개서 데이터를 가져오는 도중 에러가 발생하였습니다."
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getUserSchedulesByCategory = async (
  category: SchedulesCategory
) => {
  try {
    console.info(`사용자의 입사지원현황 데이터를 가져오는 중입니다.`);
    const apiRoute =
      allServerDataApiRoutes.getUserSchedulesByCategory(category);
    const { data } = await requestGet(authInstance, apiRoute);
    return data;
  } catch (error) {
    console.error(
      "사용자의 입사지원형황 데이터를 가져오는 도중 에러가 발생하였습니다."
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getUserResumesByCategory = async ({
  category = "",
  publishing = true,
}: {
  category: ResumesCategory;
  publishing: boolean;
}) => {
  try {
    console.info(`사용자의 자기소개서 데이터를 가져오는 중입니다.`);
    const apiRoute = allServerDataApiRoutes.getUserResumesByCategory({
      category,
      publishing,
    });
    const { data } = await requestGet(authInstance, apiRoute);
    return data;
  } catch (error) {
    console.error(
      "사용자의 자기소개 데이터를 가져오는 도중 에러가 발생하였습니다."
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getUserResumesAll = async () => {
  try {
    console.info(`사용자의 자기소개서 데이터를 가져오는 중입니다.`);
    const apiRoute = allServerDataApiRoutes.getUserResumesAll();
    const { data } = await requestGet(authInstance, apiRoute);
    return data;
  } catch (error) {
    console.error(
      "사용자의 자기소개 데이터를 가져오는 도중 에러가 발생하였습니다."
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
