const getCleanUserInfo = (rawUserInfo: any) => {
  const { email, userName, notifications } = rawUserInfo.user;
  return {
    email,
    name: userName,
    notifications: notifications.length > 0 ? notifications : null,
  };
};

export { getCleanUserInfo };
