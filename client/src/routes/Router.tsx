import React from "react";
import { Link, Routes } from "react-router-dom";
import Header from "components/header";
import SignInRouter from "./signInRouter";
import DefaultRouter from "./defaultRouter";
import useUser from "lib/firebase/useUser";
import { getUserFromCookie } from "lib/firebase/userCookies";

type Props = {
  isLoggedIn: Boolean;
};

const Router = ({ isLoggedIn }: Props) => {
  // const [uid, setUid] = React.useState<string>("");

  // React.useEffect(() => {
  //   const cookie = getUserFromCookie();
  //   setUid(cookie?.uid);
  // }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && <Header />}
      {isLoggedIn ? (
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
