import React from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  function handleLogoutError(error: any) {
    console.log("pass");

    if (error.response?.status === 401) {
      navigate("/");
    }
    return Promise.reject(error);
  }

  return handleLogoutError;
};
export default useLogout;
