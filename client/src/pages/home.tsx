import React from "react";
import Layout from "../components/layout";

const Home = () => {
  return (
    <Layout variant="default">
      <h3>회원가입</h3>
      <input placeholder="Email.." />
      <input placeholder="Password..." />
      <button>회원가입</button>

      <div>
        <h3>Login</h3>
        <input placeholder="Email" />
        <input placeholder="Password" />
        <button>Login</button>
      </div>

      <h4>logged In :</h4>
      <button>로그아웃</button>
    </Layout>
  );
};
export default Home;
