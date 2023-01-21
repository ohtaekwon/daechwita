import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "pages/auth";
import Home from "pages/home";

type Props = {
  isLoggedIn: Boolean | any;
};

const DefaultRouter = ({ isLoggedIn }: Props) => {
  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
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
export default DefaultRouter;
