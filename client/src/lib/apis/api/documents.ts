import { authInstance } from "../utils/instance";

const BASE_URL = "/documents";

type Query = {
  title?: string;
  tag?: string;
};
export const getDocuments = async (query: Query = {}) => {
  try {
    if (!query) {
      const response = await authInstance.get(BASE_URL);
      const { data } = response;
      return data;
    } else {
      const response = await authInstance.get(
        `${BASE_URL}?title=${query.title}&tag=${query.tag}`
      );
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createDocuments = async (payload: any) => {
  try {
    const response = await authInstance.post(BASE_URL, payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateDocuments = async (id: string, payload: any) => {
  try {
    const response = await authInstance.put(`${BASE_URL}/:${id}`, payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const deleteDocuments = async (id: string) => {
  try {
    const response = await authInstance.delete(`${BASE_URL}/:${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
