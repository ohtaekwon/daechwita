import { AxiosInstance } from "axios";

export function requestGet(axiosInstance: AxiosInstance, url = "") {
  return axiosInstance.get(url).then((response) => response.data);
}

export function requestPost<T>(
  axiosInstance: AxiosInstance,
  url = "",
  data: unknown,
  config = {}
) {
  return axiosInstance.post<T>(url, data, config);
}

export function requestPut(
  axiosInstance: AxiosInstance,
  url = "",
  data: unknown,
  config = {}
) {
  return axiosInstance.put(url, data, config);
}

export function requestDelete<T>(axiosInstance: AxiosInstance, url = "") {
  return axiosInstance.delete<T>(url);
}
