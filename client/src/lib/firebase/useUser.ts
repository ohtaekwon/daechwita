import { getClient, QueryKeys } from "queryClient";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./firebase.config";
import { mapUserData } from "./mapUserData";
import { getUserFromCookie, removeUserCookie } from "./userCookies";

type User = {
  uid: string;
  email: string;
  token: string;
  name: string;
  profilePic: string;
  phoneNumber: any;
};
const useUser = () => {
  const [user, setUser] = React.useState<User>();
  const navigate = useNavigate();
  const queryClient = getClient();

  // 로그아웃할 경우 쿠키값 제거하는 함수
  // 쿠키값이 제거시, app파일에 설정한대로, Auth 페이지로 자동 이동하며,
  const logout = async () => {
    try {
      await authService.signOut();
      removeUserCookie();
      await queryClient.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // Firebase는 매시간 ID 토큰을 업데이트를 하며,
    // 반응 상태와 쿠키가 모두 최신 상태로 유지되는지 확인하도록 구현
    const cancelAuthListener = authService.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUser(userData);
      } else {
        removeUserCookie();
      }
    });
    // 쿠키 가져와서 user state에 넣는다.
    const userFromCookie = getUserFromCookie();
    setUser(userFromCookie);

    // clean-up componentWillUnmount
    return () => {
      cancelAuthListener();
    };
  }, []);
  return { user, logout };
};

export default useUser;
