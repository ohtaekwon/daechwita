import axios, { AxiosInstance } from "axios";
import cookies from "js-cookie";
import { getUserFromCookie } from "lib/firebase/userCookies";

const coo = getUserFromCookie();
const { uid } = coo || "";
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
console.log(uid);
// const c = JSON.parse(coo).uid;

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
      Accept: "application/json",
      Authorization: `Bearer + ${uid}`,
    },
    ...options,
  });
};

export const baseInstance = axiosApi(baseUrl!);
export const authInstance = authApi(baseUrl!);
