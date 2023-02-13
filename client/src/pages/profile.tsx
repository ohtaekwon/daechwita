import { authService } from "lib/firebase/firebase.config";
import useUser from "lib/firebase/useUser";
import React from "react";

const Profile = () => {
  const { logout } = useUser();
  const onLogOutClick = () => {
    authService.signOut();
    logout();
  };
  return <div onClick={onLogOutClick}>profile</div>;
};
export default Profile;
