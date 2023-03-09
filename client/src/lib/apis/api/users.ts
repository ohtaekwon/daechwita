import { BASE_URL_USERS } from "utils/constants";
import { requestGet, requestPut } from "../utils/methods";

/**
 * GET /users
 */
export const getUsers = async () => {
  return await requestGet(BASE_URL_USERS);
};

/**
 * PUT /users
 */
export const updateUsers = async (id: string, payload: unknown) => {
  return await requestPut(`${BASE_URL_USERS}/${id}`, payload, {});
};
