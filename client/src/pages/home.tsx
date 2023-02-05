import React from "react";
import Section from "components/section";
import useFetch from "hooks/useFetch";
import Flex from "_common/components/flex";
import { Layout, LayoutElement } from "components/layout";
import Button from "_common/components/button";
import { Link } from "react-router-dom";

type SideMenu = {
  id: string;
  name: string;
};
const sideNavMenu: SideMenu[] = [
  { id: "1", name: "todo" },
  { id: "2", name: "자소서" },
];

const Home = ({ leftNav }: { leftNav: React.ReactNode }) => {
  const Content = LayoutElement;

  const { payload, loading } = useFetch("get", "/documents");
  console.log(sideNavMenu);
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
      {sideNavMenu.map((menu: SideMenu) => (
        <span>{menu.name}</span>
      ))}
    </>
  );
};
export default Home;
