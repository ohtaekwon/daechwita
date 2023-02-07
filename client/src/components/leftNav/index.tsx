import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./index.styles";

import Button from "_common/components/button";
import Flex from "_common/components/flex";

import { Layout } from "components/layout";

type SideMenu = {
  name: string;
  key: string;
  route: string;
};

const sideNavMenu: SideMenu[] = [
  { name: "todo", key: "1", route: "/myDashboard" },
  { name: "자소서", key: "2", route: "/myDocuments" },
];

const LeftNav = () => {
  return (
    <Layout
      as="figure"
      className="leftNav"
      variant="custom"
      width={20}
      backgroundColor="indigo_300"
    >
      <Flex direction="column">
        {sideNavMenu.map(({ name, key, route }: SideMenu) => (
          <Link to={route} key={key}>
            <Button
              variant="default"
              paddingY={9}
              paddingX={16}
              fontSize="md"
              lineHeight="md"
              color="zinc_400"
            >
              {name}
            </Button>
          </Link>
        ))}
      </Flex>
    </Layout>
  );
};

export default LeftNav;
