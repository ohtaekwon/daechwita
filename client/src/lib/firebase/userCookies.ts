import cookies from "js-cookie";

/**
 * cookie 값을 가져오도록 해주는 함수
 */
export const getUserFromCookie = () => {
  const cookie = cookies.get("Daechwita");
  if (!cookie) {
    return undefined;
  }

  return JSON.parse(cookie);
};

/**
 * cookie에 저장을 하도록 하는 함수
 */
export const setUserCookie = (user: any) => {
  cookies.set("Daechwita", JSON.stringify(user), {
    /**
     * tokens이 만료가 일치하도록 쿠키만료를 설정
     */
    expires: 12 / 24, // 24시간 설정
  });
};

/**
 * cookie 값을 제거하는 함수
 */
export const removeUserCookie = () => cookies.remove("Daechwita");
