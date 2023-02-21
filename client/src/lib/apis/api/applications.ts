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
    const { data: user } = await authInstance.get("/users");
    if (!user) throw Error("유저 정보를 불러올 수 없습니다.");
    const count = (user[0].numberOfPublishing += 1);
    console.log();
    const [response, _] = await Promise.all([
      authInstance.post(BASE_URL, {
        ...payload,
        id: `${payload.id}-${count}`,
      }),
      authInstance.put(`/users/${user[0].id}`, { numberOfPublishing: count }),
    ]);
    console.log("rseponmse", response);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateApplications = async (id: string, payload: any) => {
  try {
    const response = await authInstance.put(`${BASE_URL}/${id}`, payload, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
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
