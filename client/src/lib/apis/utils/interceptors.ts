import axios from "axios";

const authFetch = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

// 요청 인터셉터 추가
authFetch.interceptors.request.use(
  (request) => {
    request.headers.Accept = "application/json";
    console.log("request 전송");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
authFetch.interceptors.response.use(
  (response) => {
    console.log("응답을 받았습니다.");
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 404) {
      // do something
      console.log("찾을 수 없습니다.");
    }
    return Promise.reject(error);
  }
);

export default authFetch;
