import { authInstance } from "../utils/instance";

const BASE_URL = "/documents";

export const getDocuments = async () => {
  try {
    const response = await authInstance.get(BASE_URL);
    const { data } = response;
    return data;
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
    const response = await authInstance.post(`${BASE_URL}/:${id}`, payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const deleteDocuments = async (id: string) => {
  try {
    const response = await authInstance.post(`${BASE_URL}/:${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
