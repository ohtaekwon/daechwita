import { authInstance } from "./instance";

export function requestGet(url = "") {
  return authInstance.get(url).then((response) => response.data);
}

export function requestPost<T>(url = "", data: unknown, config = {}) {
  return authInstance.post<T>(url, data, config);
}

export function requestPut(url = "", data: unknown, config = {}) {
  return authInstance.put(url, data, config);
}

export function requestDelete<T>(url = "") {
  return authInstance.delete<T>(url);
}
