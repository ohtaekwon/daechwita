import { authService } from "lib/firebase/firebase.config";
import useUser from "lib/firebase/useUser";
import React from "react";

const Profile = () => {
  const { user, logout } = useUser();
  const onLogOutClick = () => logout();
  console.log(user);
  return <div onClick={onLogOutClick}>profile</div>;
};
export default Profile;
