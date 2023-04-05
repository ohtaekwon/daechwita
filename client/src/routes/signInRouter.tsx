import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Resumes from "pages/Resumes";
import Schedules from "pages/Schedules";
import Interview from "pages/Interview";
import WriteResume from "pages/WriteResume/index";

import { Layout } from "components/Layout";
import TempResumes from "pages/tempResumes";
// import WriteResume from "components/writeResume";

const url = process.env.PUBLIC_URL;
const img = `url(${url}/images/bg_color.jpg)`;

const SignInRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout variant="lg" header />}>
          <Route path="/" element={<Home />} />
          <Route path="temp/resumes" element={<TempResumes />} />
          <Route path="resumes/write" element={<WriteResume />} />
          <Route path="resumes/write/:id" element={<WriteResume />} />
        </Route>
        <Route element={<Layout variant="lg" header searchBar />}>
          <Route path="/resumes" element={<Resumes />} />
        </Route>

        <Route element={<Layout variant="default" background={img} header />}>
          <Route path="interview" element={<Interview />} />
        </Route>
        <Route element={<Layout variant="amber_lg" header />}>
          <Route path="/schedules" element={<Schedules />} />
        </Route>
      </Routes>
    </>
  );
};
export default SignInRouter;
