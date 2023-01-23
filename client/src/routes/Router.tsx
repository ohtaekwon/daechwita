import React from "react";
import { Route, Routes, redirect, Navigate } from "react-router-dom";
import Auth from "pages/auth";
import Home from "pages/home";
import Header from "components/header";
import MyDocuments from "pages/my-documents";
import Profile from "pages/profile";

type Props = {
  isLoggedIn: Boolean | any;
};

const Router = ({ isLoggedIn }: Props) => {
  return (
    <>
      {isLoggedIn && <Header />}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/my-documents" element={<MyDocuments />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </>
  );
};
export default Router;
