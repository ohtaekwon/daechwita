import React from "react";
import { authService } from "lib/firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import Button from "_common/components/button";
import useUser from "lib/firebase/useUser";

const Profile = () => {
  const { logout } = useUser();
  const onLogOutClick = () => {
    authService.signOut();
    logout();
  };
  return (
    <>
      <Button
        variant="zinc_200"
        paddingY={9}
        paddingX={16}
        fontSize="md"
        lineHeight="md"
        color="zinc_400"
        onClick={onLogOutClick}
      >
        로그아웃
      </Button>
    </>
  );
};

export default Profile;
