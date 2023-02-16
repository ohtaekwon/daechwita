import cookies from "js-cookie";

export const getUserFromCookie = () => {
  const cookie = cookies.get("Daechwita");
  if (!cookie) {
    return undefined;
  }

  return JSON.parse(JSON.parse(JSON.stringify(cookie)));
};

export const setUserCookie = (user: any) => {
  cookies.set("Daechwita", JSON.stringify(user), {
    // firebase id tokens이 1시간 뒤 만료가 일치하도록 쿠키만료를 설정
    expires: 3 / 24,
  });
};
export const removeUserCookie = () => cookies.remove("Daechwita");
