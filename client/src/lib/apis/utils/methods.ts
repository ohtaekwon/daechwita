import { authInstance } from "./instance";

export function requestGet(url = "") {
  return authInstance.get(url).then((response) => response.data);
}

export function requestPost<T>(url = "", data: unknown, options = {}) {
  return authInstance.post<T>(url, data, options);
}

export function requestPut(url = "", data: unknown, options = {}) {
  return authInstance.put(url, data, options);
}

export function requestDelete<T>(url = "") {
  return authInstance.delete<T>(url);
}
