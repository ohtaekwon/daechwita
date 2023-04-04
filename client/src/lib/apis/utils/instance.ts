import axios, { AxiosInstance } from "axios";
import { getUserFromCookie } from "lib/firebase/userCookies";

/**
 * express server base
 */
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
/**
 * cookie 값에서 uid 가져온 뒤, 토큰에 넣기
 */
const cookie = getUserFromCookie();
const { uid } = cookie || "";

/**
 * 기본 API Axios Instance
 */
const basicApi = (url: string, options?: any): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      withCredentials: true,
    },
  });
  return instance;
};

/**
 * 인증 필요한 API Axios Instance
 */
const authApi = (url: string, options?: any): AxiosInstance => {
  return axios.create({
    baseURL: url,
    headers: {
      // "content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${uid}`, // 토큰값으로 uid
    },
    ...options,
  });
};
export const baseInstance = basicApi(baseUrl!);
export const authInstance = authApi(baseUrl!, { withCredentials: true });
