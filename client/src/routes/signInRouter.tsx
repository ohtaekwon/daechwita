import React from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "components/layout";

import Home from "pages/home";
import Resumes from "pages/resumes";
import WriteResume from "pages/writeResume";
import Schedules from "pages/schedules";
import Interview from "pages/interview";
import Profile from "pages/profile";

import { generatorRandomCount } from "utils/helpers";

const SignInRouter = () => {
  const url = process.env.PUBLIC_URL;
  const homeImage = `url(${url}/images/bg_space.jpg)`;
  const writeImage = `url(${url}/images/bg_0${generatorRandomCount(7)}.jpg)`;

  return (
    <>
      <Routes>
        <Route
          element={<Layout variant="default" background={homeImage} inHeader />}
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<Layout variant="default" header />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="interview" element={<Interview />} />
        </Route>

        <Route element={<Layout variant="amber_lg" header />}>
          <Route path="/schedules" element={<Schedules />} />
        </Route>

        <Route element={<Layout variant="lg" header searchBar />}>
          <Route path="/resumes" element={<Resumes />} />
        </Route>

        <Route
          element={
            <Layout variant="write" background={writeImage} header searchBar />
          }
        >
          <Route path="resumes/write" element={<WriteResume />} />
          <Route path="resumes/write/:id" element={<WriteResume />} />
        </Route>
      </Routes>
    </>
  );
};
export default SignInRouter;
