import axios from "axios";
import useUser from "lib/firebase/useUser";
import React from "react";

const Profile = () => {
  const { user, logout } = useUser();
  const onLogOutClick = () => logout();

  return <div onClick={onLogOutClick}>profile</div>;
};
export default Profile;
