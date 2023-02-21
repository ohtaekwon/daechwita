import { authInstance } from "../utils/instance";
const BASE_URL = "/applications";

/**
 * GET /applications
 *
 * 📌 초기에는 formData로 했으나, formData는 GET/POST만 가능하며,
 * PUT/PETCH/DELETE 메소드는 사용 불가로, 로직과 서비스 작동 방식의 변경
 *
 * */

/**
 * GET /applications
 *
 */
export const getApplications = async (
  query: { title?: string; tag?: string } = {}
) => {
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

/**
 * POST /applications
 *
 * 추가 버튼 클릭 시, user의 numberOfPublishing에서 +1이 추가되며,
 * 추가된 숫자의 params로 추가 페이지로 이동
 */
export const createApplications = async (payload: any) => {
  try {
    const { data: user } = await authInstance.get("/users");
    if (!user) throw Error("유저 정보를 불러올 수 없습니다.");
    const count = (user[0].numberOfPublishing += 1);
    const [response, _] = await Promise.all([
      authInstance.post(BASE_URL, {
        ...payload,
        id: `${payload.id}-${count}`,
      }),
      authInstance.put(`/users/${user[0].id}`, { numberOfPublishing: count }),
    ]);
    return response;
  } catch (error) {
    console.error(error);
  }
};
/**
 * PUT /applications
 *
 * 추가 페이지에서 저장하기 버튼을 누르면, update된 정보들을 전송
 *
 */
export const updateApplications = async (id: string, payload: any) => {
  try {
    const response = await authInstance.put(`${BASE_URL}/${id}`, payload, {
      // formData를 요청할 경우 헤더에 작성
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
