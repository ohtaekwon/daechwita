import axios from "axios";
import { getUserFromCookie, removeUserCookie } from "lib/firebase/userCookies";
import useLogout from "hooks/app/useLogout";

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
export const baseInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${getUserFromCookie()}`,
  },
  withCredentials: true,
});

/**
 * 인증 필요한 API Axios Instance
 *
 * @param url cors url
 * @param options 추가 옵션
 * @description 인증된 axios 사용할 떄, cookie에서 Token을 가져와서 Authorization에 넣어줍니다.
 */
const authInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

/**
 1. 요청 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
authInstance.interceptors.request.use(
  // HTTP Authorization 요청 헤더에 jwt-token을 넣음
  // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
  async (config) => {
    const token = getUserFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
authInstance.interceptors.response.use(
  (response) => {
    // 응답이 성공적으로 처리된 경우
    console.log("응답을 받았습니다.");
    return response;
  },
  (error) => {
    // 응답이 에러인 경우

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("찾을 수 없습니다.");
      removeUserCookie();
      window.location.href = "/";
      // return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export { authInstance };
