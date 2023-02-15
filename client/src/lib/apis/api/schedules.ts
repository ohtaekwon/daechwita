import { authInstance } from "../utils/instance";

const BASE_URL = "/schedules";
export const getSchedules = async () => {
  try {
    const response = await authInstance.get(BASE_URL);
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const createSchedules = async (payload: any) => {
  try {
    const response = await authInstance.post(BASE_URL, payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const updateSchedules = async (id: string, payload: any) => {
  try {
    const response = await authInstance.put(`${BASE_URL}/:${id}`, payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const deleteSchedules = async (payload: any) => {
  try {
    const response = await authInstance.delete(BASE_URL, payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};
