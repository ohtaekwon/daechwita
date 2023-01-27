import axios from "axios";

const BASE_URL = "http://localhost:8000";

// axios 인스턴스 생성
const request = axios.create({
  baseURL: BASE_URL,
});

// 요청 타임아웃 설정
request.defaults.timeout = 2500;

// 요청 인터셉터 추가
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("axios 에러", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default request;
