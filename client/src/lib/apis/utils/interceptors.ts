import { getUserFromCookie } from "lib/firebase/userCookies";
import { authInstance } from "./instance";
import useLogout from "hooks/app/useLogout";
import { getClient } from "queryClient";
import { QueryClient } from "react-query";

/**
 1. 요청 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
authInstance.interceptors.request.use(
  // HTTP Authorization 요청 헤더에 jwt-token을 넣음
  // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
  async (config) => {
    const token = getUserFromCookie();
    console.log("인터셉터 토큰", token);
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
      useLogout();
      // window.location.href = "/";
      // return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default authInstance;
