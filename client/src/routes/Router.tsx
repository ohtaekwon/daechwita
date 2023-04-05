import React from "react";
import Header from "components/Header";
import SignInRouter from "./signInRouter";
import DefaultRouter from "./defaultRouter";
import Footer from "components/Footer";

type Props = {
  isLoggedIn: Boolean;
};

const Router = ({ isLoggedIn }: Props) => {
  return <>{isLoggedIn ? <SignInRouter /> : <DefaultRouter />}</>;
};
export default Router;
