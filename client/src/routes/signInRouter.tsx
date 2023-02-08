import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, LayoutElement } from "components/layout";

import Button from "_common/components/button";

import Home from "pages/home";
import MyDocuments from "pages/my-documents";
import Profile from "pages/profile";
import Flex from "_common/components/flex";
import LeftNav from "components/leftNav";
import MyDashBoard from "pages/myDashBoard";
import Kanban from "pages/kanban";

type SideMenu = {
  [key: string]: any;
};
const SignInRouter = ({ sideNavMenu }: SideMenu) => {
  const Content = LayoutElement;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home leftNav={<LeftNav />} />} />
        <Route path="/my-documents" element={<MyDocuments />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/myDashboard"
          element={<MyDashBoard leftNav={<LeftNav />} />}
        />
        <Route path="/kanban" element={<Kanban leftNav={<LeftNav />} />} />
      </Routes>
    </>
  );
};
export default SignInRouter;
