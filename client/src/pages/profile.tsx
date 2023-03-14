import React from "react";
import useUser from "lib/firebase/useUser";
import Button from "_common/components/button";

const Profile = () => {
  const { user, logout } = useUser();
  const onLogOutClick = () => logout();

  return (
    <Button variant="primary" onClick={onLogOutClick}>
      로그아웃
    </Button>
  );
};
export default Profile;
