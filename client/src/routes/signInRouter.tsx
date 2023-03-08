import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/home";
import Resumes from "pages/resumes";
import MyTodo from "pages/todo";
import MySchedule from "pages/my-schedule";
import MyInterview from "pages/my-interview";
import Profile from "pages/profile";
import AddDocument from "pages/add-document";
import WriteResume from "pages/writeResume";
import Interview from "pages/interview";

import MyDashBoard from "pages/my-dashBoard";

import LeftNav from "components/leftNav";
import { Layout } from "components/layout";

import { generatorRandomCount } from "utils/helpers/random";

const SignInRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout variant="default" />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-schedule" element={<MySchedule />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/add/:id" element={<AddDocument />} />
        <Route path="/my-interview" element={<Interview />} />

        <Route
          path="/resumes"
          element={<Layout variant="lg" layoutType={true} />}
        >
          <Route path="/resumes" element={<Resumes />} />
        </Route>

        <Route
          path="/write"
          element={
            <Layout
              variant="write"
              layoutType={true}
              backgroundImage={`url(${
                process.env.PUBLIC_URL
              }/images/bg_0${generatorRandomCount(7)}.jpg)`}
            />
          }
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
