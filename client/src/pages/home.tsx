import React from "react";
import Section from "components/section";
import useFetch from "hooks/useFetch";
import Flex from "_common/components/flex";
import { Layout, LayoutElement } from "components/layout";

const Home = ({ leftNav }: { leftNav: React.ReactNode }) => {
  const Content = LayoutElement;

  const { payload, loading } = useFetch("get", "/documents");
  return (
    <>
      <div className="homepage">
        <Flex as="main">
          {leftNav}

          <Layout
            as="section"
            className="centerContent"
            variant="custom"
            width={80}
          >
            asdsadasd
          </Layout>
        </Flex>
      </div>
    </>
  );
};
export default Home;
