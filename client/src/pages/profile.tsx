import axios from "axios";
import useUser from "lib/firebase/useUser";
import React from "react";

const Profile = () => {
  const { user, logout } = useUser();
  const onLogOutClick = () => logout();

  const fetchData = async () => {
    const req1 = await axios("schedules");
    console.log(req1);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return <div onClick={onLogOutClick}>profile</div>;
};
export default Profile;
