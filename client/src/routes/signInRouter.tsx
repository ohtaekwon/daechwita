import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/home";
import MyDocuments from "pages/my-documents";
import LeftNav from "components/leftNav";
import MyDashBoard from "pages/my-dashBoard";
import MyTodo from "pages/todo";
import MySchedule from "pages/my-schedule";
import MyInterview from "pages/my-interview";
import Profile from "pages/profile";
import AddDocument from "pages/add-document";

const SignInRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home leftNav={<LeftNav />} />} />
        <Route path="/todo" element={<MyTodo leftNav={<LeftNav />} />} />
        <Route
          path="/my-schedule"
          element={<MySchedule leftNav={<LeftNav />} />}
        />
        <Route
          path="/my-documents"
          element={<MyDocuments leftNav={<LeftNav />} />}
        />
        <Route
          path="/add-document"
          element={<AddDocument leftNav={<LeftNav />} />}
        />

        <Route
          path="/my-dashboard"
          element={<MyDashBoard leftNav={<LeftNav />} />}
        />
        <Route path="/my-interview" element={<MyInterview />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};
export default SignInRouter;
