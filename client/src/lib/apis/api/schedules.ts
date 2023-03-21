import { AxiosResponse } from "axios";
import { Schedule } from "types/schedule";
import { handleError } from "../utils/helpers";
import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/methods";

export const basePath = "/schedules";

export const schedulesApiRoutes = {
  getScheduleById: (scheduleId: string) => `${basePath}/${scheduleId}`,
  updateScheduleById: (scheduleId: string) => `${basePath}/${scheduleId}`,
  deleteScheduleById: (scheduleId: string) => `${basePath}/${scheduleId}`,
};

/**
 * GET All schedules
 *
 */
export const getAllSchedules = async () => {
  try {
    console.info(`입사 지원 현황 데이터를 전부 가져오는 중 입니다...`);
    const { data } = await requestGet(basePath);
    console.info("입사 지원 현황 데이터가 성공적으로 반환되었습니다.");
    return data;
  } catch (error) {
    console.error(error);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * GET schedule
 *
 */
export const getSchedule = async (scheduleId: string) => {
  try {
    const apiRoute = schedulesApiRoutes.updateScheduleById(scheduleId);
    console.info(`입사 지원 현황 데이터를 전부 가져오는 중 입니다...`);
    const { data } = await requestGet(apiRoute);
    console.info("입사 지원 현황 데이터가 성공적으로 반환되었습니다.");
    return data;
  } catch (error) {
    console.error(error);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * POST schedule
 *
 *  @param payload
 */
export const createSchedule = async (payload: unknown = {}) => {
  try {
    console.info("자입사 지원 현황 데이터를 작성성 중 입니다...");
    const { data }: { data: Schedule } = await requestPost(basePath, payload);
    console.info(`입사 지원 현황 데이터 ${data?.id!}가 반환되었습니다!`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
/**
 * PUT schedule
 *
 * @param scheduleId
 * @param payload
 */
export const updateSchedules = async (
  scheduleId: string,
  payload: unknown = {}
) => {
  try {
    const apiRoute = schedulesApiRoutes.updateScheduleById(scheduleId);
    const response = await requestPut(apiRoute, payload);
    return response;
  } catch (error) {
    console.error(`입사 지원 현황 데이터를 변경하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * DELETE schedule
 *
 * @param scheduleId
 */

export const deleteSchedules = async (scheduleId: string) => {
  try {
    const apiRoute = schedulesApiRoutes.deleteScheduleById(scheduleId);
    console.info(
      `id: ${scheduleId}가진 입사 지원현황 데이터를 삭제 중 입니다...`
    );
    const response = await requestDelete(apiRoute);
    return response;
  } catch (error) {
    console.error(`입사 지원 현황 데이터를 삭제하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
