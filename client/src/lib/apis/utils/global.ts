import axios from "axios";

/**
 * axios global 설정
 */
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.timeout = 100000;

// 캐싱 방지
axios.defaults.headers.get["Cache-Control"] = "no-cache";
axios.defaults.headers.get["Pragma"] = "no-cache";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
