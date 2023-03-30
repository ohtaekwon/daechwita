import React from "react";
import Auth from "pages/auth";
import { Route, Routes } from "react-router-dom";
import { Layout } from "components/layout";

const DefaultRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout variant="default" />}>
          <Route path="/" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
};
export default DefaultRouter;
