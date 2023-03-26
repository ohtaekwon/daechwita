import React from "react";
import Auth from "pages/auth";
import { Route, Routes } from "react-router-dom";
import { Layout } from "components/layout";

const DefaultRouter = () => {
  const url = process.env.PUBLIC_URL;
  const spaceImg = `url(${url}/images/bg_color.jpg)`;

  // const spaceImg = `url(${url}/images/bg_space.jpg)`;
  return (
    <>
      <Routes>
        <Route element={<Layout variant="default" background={spaceImg} />}>
          <Route path="/" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
};
export default DefaultRouter;
