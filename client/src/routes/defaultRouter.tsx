import React from "react";
import Auth from "pages/auth";
import { Route, Routes } from "react-router-dom";

const DefaultRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </>
  );
};
export default DefaultRouter;
