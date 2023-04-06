import axios, { AxiosInstance } from "axios";
import { getUserFromCookie } from "lib/firebase/userCookies";

/**
 * @constant baseUrl SERVER URL
 */
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * 기본 API Axios Instance
 *
 * @param url cors url
 * @param options 추가 옵션
 */
const basicApi = (url: string, options?: any): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${getUserFromCookie()}`,
    },
  });
  return instance;
};

/**
 * 인증 필요한 API Axios Instance
 *
 * @param url cors url
 * @param options 추가 옵션
 * @description 인증된 axios 사용할 떄, cookie에서 Token을 가져와서 Authorization에 넣어줍니다.
 */
const authApi = (url: string, options?: any): AxiosInstance => {
  return axios.create({
    baseURL: url,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      // Authorization: `Bearer ${getUserFromCookie()}`, // 토큰값으로 uid
    },
    ...options,
  });
};

export const baseInstance = basicApi(baseUrl!, { withCredentials: true });
export const authInstance = authApi(baseUrl!, { withCredentials: true });

const preAuthInstance = authApi(baseUrl!, { withCredentials: true });

preAuthInstance.interceptors.request.use((config) => {
  const token = getUserFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default preAuthInstance;
