export const mapUserData = (user: any) => {
  /**
   * uid : 각 아이디가 가지고 있는 고유의 uid
   * xa : 토큰
   */
  const { uid, email, accessToken, displayName, photoURL, phoneNumber } = user;
  return {
    uid,
    email,
    token: accessToken,
    name: displayName,
    profilePic: photoURL,
    phoneNumber,
  };
};
