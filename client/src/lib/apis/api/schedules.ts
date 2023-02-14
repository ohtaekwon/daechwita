import { SchedulesType } from "types/index.types";
import { authInstance } from "../utils/instance";

export const getSchedules = async () => {
  try {
    const response = await authInstance.get("/schedules");
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postSchedules = async (payload: any) => {
  try {
    const response = await authInstance.post("/schedules", payload);
    return response;
  } catch (error) {
    console.error(error);
  }
};
