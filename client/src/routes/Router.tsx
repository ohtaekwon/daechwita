import React from "react";
import { Link, Routes } from "react-router-dom";
import Header from "components/header";
import SignInRouter from "./signInRouter";
import DefaultRouter from "./defaultRouter";
import useUser from "lib/firebase/useUser";
import { getUserFromCookie } from "lib/firebase/userCookies";

type Props = {
  isLoggedIn: Boolean;
  cookie: any;
};

const Router = ({ isLoggedIn, cookie }: Props) => {
  return (
    <>
      {isLoggedIn && <Header />}
      {cookie && isLoggedIn ? (
        <>
          <SignInRouter />
        </>
      ) : (
        <DefaultRouter />
      )}
    </>
  );
};
export default Router;
