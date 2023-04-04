import { handleError } from "../utils/helpers";
import { requestPost } from "../utils/methods";
import { baseInstance } from "../utils/instance";

const BASE_PATH = "api/v1";

export const authApiRoutes = {
  signUp: () => `${BASE_PATH}/signup`,
  login: () => `${BASE_PATH}/login`,
};

/**
 * 회원가입
 * @param payload email, password
 * @returns
 */
export const signUp = async (payload: unknown = {}) => {
  try {
    const apiRoute = authApiRoutes.signUp();
    const { data } = await requestPost(baseInstance, apiRoute, payload);
    return data;
  } catch (error) {
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const login = async (payload: unknown = {}) => {
  try {
    const apiRoute = authApiRoutes.login();
    const { data } = await requestPost(baseInstance, apiRoute, payload);
    return data;
  } catch (error) {
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};
