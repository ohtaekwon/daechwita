import React from "react";
import { Link, Routes } from "react-router-dom";
import Header from "components/header";
import SignInRouter from "./signInRouter";
import DefaultRouter from "./defaultRouter";
import { Layout } from "components/layout";
import Flex from "_common/components/flex";
import Section from "components/section";
import DefaultLayout from "components/layout/defaultLayout";
import Button from "_common/components/button";

type Props = {
  isLoggedIn: Boolean | any;
};

type SideMenu = {
  [key: string]: any;
};

const sideNavMenu: SideMenu = [
  { name: "todo", key: "todo" },
  { name: "자소서", key: "abc" },
];

const Router = ({ isLoggedIn }: Props) => {
  return (
    <>
      {isLoggedIn && <Header />}
      {isLoggedIn ? (
        <SignInRouter sideNavMenu={sideNavMenu} />
      ) : (
        <DefaultRouter />
      )}
    </>
  );
};
export default Router;
