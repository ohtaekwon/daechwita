import { authInstance } from "../utils/instance";

const BASE_URL = "/applications";

type Query = {
  title?: string;
  tag?: string;
};
export const getApplications = async (query: Query = {}) => {
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

export const createApplications = async (payload: any) => {
  try {
    const response = await authInstance.post(BASE_URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateApplications = async (id: string, payload: any) => {
  try {
    const response = await authInstance.put(`${BASE_URL}/:${id}`, payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const deleteApplications = async (id: string) => {
  try {
    const response = await authInstance.delete(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
