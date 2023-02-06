import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./index.styles";

import Button from "_common/components/button";
import Flex from "_common/components/flex";

import { Layout } from "components/layout";

type SideMenu = {
  name: string;
  key: string;
};

const sideNavMenu: SideMenu[] = [
  { name: "todo", key: "1" },
  { name: "자소서", key: "2" },
  { name: "일기", key: "3" },
  { name: "달력", key: "4" },
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
        {sideNavMenu.map((menu: SideMenu) => (
          <Link to="/" key={menu.key}>
            <Button
              variant="default"
              paddingY={9}
              paddingX={16}
              fontSize="md"
              lineHeight="md"
              color="zinc_400"
            >
              {menu.name}
            </Button>
          </Link>
        ))}
      </Flex>
    </Layout>
  );
};

export default LeftNav;
