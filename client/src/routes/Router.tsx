import React from "react";
import { Routes } from "react-router-dom";
import Header from "components/header";
import SignInRouter from "./signInRouter";
import DefaultRouter from "./defaultRouter";

type Props = {
  isLoggedIn: Boolean | any;
};

const Router = ({ isLoggedIn }: Props) => {
  return (
    <>
      {isLoggedIn && <Header />}
      {isLoggedIn ? <SignInRouter /> : <DefaultRouter />}
    </>
  );
};
export default Router;
