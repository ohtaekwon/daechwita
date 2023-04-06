import authInstance from "../utils/interceptors";
import { handleError } from "../utils/helpers";
import { requestGet, requestPost, requestPut } from "../utils/methods";

export const basePath = "/users";

export const usersApiRoutes = {
  getUsersById: (Id: string) => `${basePath}/${Id}`,
  updateUsersById: (Id: string) => `${basePath}/${Id}`,
};

/**
 * GET All users
 */
export const getAllUsers = async () => {
  try {
    console.info(`유저 정보를 가져오는 중 입니다...`);
    const { data } = await requestGet(authInstance, basePath);
    console.info(`유저 정보를 성공적으로 반환되었습니다!`);
    return { data };
  } catch (error) {
    console.error(`자기소개서를 가져오는 도중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * GET user
 *
 * @param id 해당 id를 가진 유저 정보만 가져온다.
 */

export const getUser = async (id: string) => {
  try {
    const apiRoute = usersApiRoutes.getUsersById(id);
    console.info(`id : ${id}를 가진 유저의 정보를 가져오는 중 입니다.`);
    const { data } = await requestGet(authInstance, apiRoute);
    return { data };
  } catch (error) {
    console.error(
      `id: ${id}를 가진 유저의 정보를 가져오는 도중 에러가 발생하였습니다!`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * POST user
 *
 * @param payload
 */
export const createUser = async (payload: unknown = {}) => {
  try {
    console.info("유저의 회원 가입을 하는 중 입니다.");
    const { data } = await requestPost(authInstance, basePath, payload);
    console.info(`회원 가입이 성공적으로 되었습니다!`);
    return data;
  } catch (error) {
    console.error(`유저의 정보를 전송하던 중 에러가 발생하였습니다!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
/**
 * PUT user
 *
 * @param id
 * @param payload
 */
export const updateUser = async (id: string, payload: unknown = {}) => {
  try {
    const apiRoute = usersApiRoutes.updateUsersById(id);
    console.info(`id: ${id}를 가진 유저의 정보를 변경 중 입니다.`);
    const response = await requestPut(authInstance, apiRoute, payload);
    return response;
  } catch (error) {
    console.error("유저 정보를 변경하던 중 에러가 발생하였습니다.");
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
