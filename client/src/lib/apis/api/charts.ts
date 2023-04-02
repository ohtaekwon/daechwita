import { handleError } from "../utils/helpers";
import { requestGet } from "../utils/methods";

const basePathAll = "all";
const basePathUser = "user";

const BASE_PATH_TOTAL = "total";

const dict = {
  resumes: "자기소개서",
  schedules: "입사 지원현황",
};

export const allServerDataApiRoutes = {
  getTotalDataByRoute: (route: string) => `${basePathAll}/${route}`,
  getUserAllDataByRoute: (route: string, query?: boolean) =>
    `${basePathUser}/${route}?publishing=${query}`,

  // 새롭게 만듬
  getTotalSchedulesByCategory: (query: string) =>
    `${BASE_PATH_TOTAL}/schedules?category=${query}`,
};

export const getTotalChartData = async (route: "resumes" | "schedules") => {
  try {
    const apiRoute = allServerDataApiRoutes.getTotalDataByRoute(route);
    console.info(`${dict[route]}의 모든 데이터를 가져오는 중 입니다...`);
    const { data } = await requestGet(apiRoute);
    return data;
  } catch (error) {
    console.error(
      `${dict[route]}의 데이터를 가져오는 도중 에러가 발생하였습니다.`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getUserChartData = async (
  route: "resumes" | "schedules",
  query: boolean = true
) => {
  try {
    const apiRoute = allServerDataApiRoutes.getUserAllDataByRoute(route, query);
    console.info(`${dict[route]}의 모든 데이터를 가져오는 중 입니다...`);
    const { data } = await requestGet(apiRoute);
    return data;
  } catch (error) {
    console.error(
      `${dict[route]}의 데이터를 가져오는 도중 에러가 발생하였습니다.`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

// --------------- 새로 만듬 ---------------

/**
 *
 * @param query
 * @returns
 */

export const getTotalSchedulesByCategory = async (query: string) => {
  try {
    const apiRoute = allServerDataApiRoutes.getTotalSchedulesByCategory(query);
    const { data } = await requestGet(apiRoute);
    return data;
  } catch (error) {
    console.error("데이터를 가져오는 도중 에러가 발생하였습니다.");
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
