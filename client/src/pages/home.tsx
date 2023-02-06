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
      <div
        className="homepage"
        style={{ width: "100%", backgroundColor: "#eaeaea" }}
      >
        <Flex as="main">
          {leftNav}
          {/* <Layout
            as="section"
            className="centerContent"
            variant="custom"
            width={80}
            backgroundColor="neutral_100"
          >
            sadsadsadsads
          </Layout> */}
          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(5, 1fr)"
          >
            <div>섹션1</div>
            <div>섹션2</div>
            <div>섹션3</div>
            <div>섹션4</div>
            <div>섹션5</div>
            <div>섹션6</div>
            <div>섹션7</div>
            <div>섹션8</div>
            <div>섹션9</div>
            <div>섹션10</div>
            <div>섹션11</div>
            <div>섹션12</div>
          </Section>
        </Flex>
      </div>
    </>
  );
};
export default Home;
