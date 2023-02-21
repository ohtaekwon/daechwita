/**
 * GET users의 데이터 정제
 *
 * 수정 예정 ✅
 */
const getCleanUserInfo = (rawUserInfo: any) => {
  const { email, userName, notifications } = rawUserInfo.user;
  return {
    email,
    name: userName,
    notifications: notifications.length > 0 ? notifications : null,
  };
};

export { getCleanUserInfo };
