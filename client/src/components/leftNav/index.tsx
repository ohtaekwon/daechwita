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

const sideNavMenu: any = [
  { name: "todo", key: "todo" },
  { name: "자소서", key: "abc" },
];

const LeftNav = () => {
  console.log(sideNavMenu.map((menu: any) => console.log(menu.name)));
  return (
    <Styled.Wrapper>
      <Layout
        as="figure"
        className="leftNav"
        variant="custom"
        width={20}
        backgroundColor="indigo_300"
      >
        <Flex direction="column">
          {sideNavMenu.map((menu: any) => {
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
            </Link>;
          })}
          {/* <Link to="/">
            <Button
              variant="default"
              paddingY={9}
              paddingX={16}
              fontSize="md"
              lineHeight="md"
              color="zinc_400"
            >
              자소서
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="default"
              paddingY={9}
              paddingX={16}
              fontSize="md"
              lineHeight="md"
              color="zinc_400"
            >
              자소서
            </Button>
          </Link> */}
        </Flex>
      </Layout>
    </Styled.Wrapper>
  );
};

export default LeftNav;
