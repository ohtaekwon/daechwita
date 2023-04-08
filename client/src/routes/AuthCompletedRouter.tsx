import React from "react";
import { Route, Routes } from "react-router-dom";

import Interview from "pages/Interview";

import { Layout } from "components/Layout";

const url = process.env.PUBLIC_URL;
const img = `url(${url}/images/bg_color.jpg)`;

const Home = React.lazy(() => import("pages/Home"));
const Resumes = React.lazy(() => import("pages/Resumes"));
const WriteResume = React.lazy(() => import("pages/WriteResume"));
const Schedules = React.lazy(() => import("pages/Schedules"));
const TempResumes = React.lazy(() => import("pages/TempResumes"));

const AuthCompletedRouter = () => {
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
export default AuthCompletedRouter;
