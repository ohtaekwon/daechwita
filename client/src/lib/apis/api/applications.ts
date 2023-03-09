import { BASE_URL_APPLICATIONS } from "utils/constants";
import { authInstance } from "../utils/instance";
import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/methods";
import { getUsers, updateUsers } from "./users";
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
export const getApplications = async () => {
  try {
    const response = await requestGet(BASE_URL_APPLICATIONS);
    return response;
  } catch (err) {
    console.log(err);
  }
};

/**
 * POST /applications
 *
 * 추가 버튼 클릭 시, user의 numberOfPublishing에서 +1이 추가되며,
 * 추가된 숫자의 params로 추가 페이지로 이동
 *
 * @param payload server의 application router로 uid를 보낸다.
 */
export const createApplications = async (payload: any) => {
  try {
    const users = await getUsers();
    if (!users) throw Error("유저 정보를 불러올 수 없습니다.");
    const user = users[0];
    const count = (user.numberOfPublishing += 1);

    const newApplication = {
      ...payload,
      id: `${payload.id}-${count}`,
    };

    return await Promise.all([
      requestPost(BASE_URL_APPLICATIONS, newApplication), // POST - 빈
      updateUsers(user.id, { numberOfPublishing: count }), // PUT - users의 publishing +1
    ]);
  } catch (error) {
    console.error(error);
  }
};
/**
 * PUT /applications
 *
 * 추가 페이지에서 저장하기 버튼을 누르면, update된 정보들을 전송
 *
 * @param id
 * @param payload
 *
 */
export const updateApplications = async (id: string, payload: any) => {
  try {
    return await requestPut(`${BASE_URL_APPLICATIONS}/${id}`, payload);
  } catch (error) {
    console.error(error);
  }
};
export const deleteApplications = async (id: string) => {
  try {
    const response = await requestDelete(`${BASE_URL_APPLICATIONS}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// {
// config :
//   formData를 요청할 경우 헤더에 작성
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// }
