import axios, { AxiosInstance } from "axios";
import { getUserFromCookie } from "lib/firebase/userCookies";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * cookie 값에서 uid 가져온 뒤, 토큰에 넣기
 */
const cookie = getUserFromCookie();
const { uid } = cookie || "";

/**
 * 기본 API Axios Instance
 */
const axiosApi = (url: string, options?: any): AxiosInstance => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

/**
 * 인증 필요한 API Axios Instance
 */
const authApi = (url: string, options?: any): AxiosInstance => {
  return axios.create({
    baseURL: url,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${uid}`, // 토큰값으로 uid
    },
    ...options,
  });
};

export const baseInstance = axiosApi(baseUrl!);
export const authInstance = authApi(baseUrl!, { withCredentials: true });
