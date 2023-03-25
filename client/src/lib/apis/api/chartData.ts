import { handleError } from "../utils/helpers";
import { requestGet } from "../utils/methods";

const basePathAll = "all";
const basePathUser = "user";

const dict = {
  resumes: "자기소개서",
  schedules: "입사 지원현황",
};

export const allServerDataApiRoutes = {
  getTotalDataByRoute: (route: string) => `${basePathAll}/${route}`,
  getUserAllDataByRoute: (route: string) => `${basePathUser}/${route}`,
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

export const getUserChartData = async (route: "resumes" | "schedules") => {
  try {
    const apiRoute = allServerDataApiRoutes.getUserAllDataByRoute(route);
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
