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
import { Layout } from "components/layout";
import WriteResume from "pages/writeResume";
import Interview from "pages/interview";

const SignInRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout variant="default" />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-schedule" element={<MySchedule />} />
          <Route path="/my-documents" element={<MyDocuments />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/add/:id" element={<AddDocument />} />
        <Route path="/my-interview" element={<Interview />} />

        <Route
          path="/my-documents"
          element={<Layout variant="lg" layoutType={true} />}
        >
          <Route path="/my-documents" element={<MyDocuments />} />
        </Route>
        <Route
          path="/write"
          element={<Layout variant="lg" layoutType={true} />}
        >
          <Route path="/write/resume" element={<WriteResume />} />
        </Route>

        <Route path="/todo" element={<MyTodo />} />

        <Route path="/my-interview" element={<MyInterview />} />
      </Routes>
    </>
  );
};
export default SignInRouter;
