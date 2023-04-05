import { getUserFromCookie } from "lib/firebase/userCookies";
import { authInstance } from "./instance";

/**
 1. 요청 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
authInstance.interceptors.request.use(
  // HTTP Authorization 요청 헤더에 jwt-token을 넣음
  // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
  async (config) => {
    config.headers = config.headers ?? {};
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    // config.headers.Authorization = `Bearer ${uid}`;
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
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */
    console.log("응답을 받았습니다.");
    return response;
  },
  (error) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
    if (error.response.status === 404) {
      console.log("찾을 수 없습니다.");
    }
    return Promise.reject(error);
  }
);

export default authInstance;
