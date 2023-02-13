import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./firebase.config";
import { mapUserData } from "./mapUserData";
import { getUserFromCookie, removeUserCookie } from "./userCookies";

type User = {
  uid: any;
  email: string;
  token: string;
  name: string;
  profilePic: string;
  phoneNumber: any;
};
const useUser = () => {
  const [user, setUser] = React.useState<User>();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await authService.signOut();
      removeUserCookie();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = authService.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUser(userData);
      } else {
        removeUserCookie();
      }
    });

    const userFromCookie = getUserFromCookie();

    setUser(userFromCookie);

    if (!userFromCookie) {
      // 쿠키가 없을시에 리다이렉트
      navigate("/");
      return;
    }
    return () => {
      cancelAuthListener();
    };
  }, []);
  return { user, logout };
};

export default useUser;
