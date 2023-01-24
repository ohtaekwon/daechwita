import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "pages/home";
import MyDocuments from "pages/my-documents";
import Profile from "pages/profile";

const SignInRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-documents" element={<MyDocuments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};
export default SignInRouter;
