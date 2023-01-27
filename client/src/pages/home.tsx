import axios from "axios";
import useFetch from "hooks/useFetch";
import React from "react";
import Layout from "../components/layout";

const Home = () => {
  const { payload, loading } = useFetch("get", "/documents");
  console.log("payload", loading, payload);
  return (
    <Layout variant="default">
      <div style={{ display: "flex", flexDirection: "column" }}>Home</div>
    </Layout>
  );
};
export default Home;
