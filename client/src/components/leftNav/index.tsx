import React from "react";
import * as Styled from "./index.styles";

import { Link } from "react-router-dom";

import Button from "_common/components/button";
import Flex from "_common/components/flex";
import Section from "components/section";

type SideMenu = {
  name: string;
  key: string;
  route: string;
};

const sideNavMenu: SideMenu[] = [
  { name: "To-do", key: "todo", route: "/todo" },
  { name: "나의 일정", key: "my-schedule", route: "/my-schedule" },
  { name: "자기소개서", key: "my-documents", route: "/my-documents" },
  { name: "대쉬보드", key: "my-dashboard", route: "/my-dashboard" },
  { name: "면접 연습하기", key: "my-interview", route: "/my-interview" },
];

const LeftNav = () => {
  return (
    <Section
      as="figure"
      className="leftNav"
      sectionType="flex"
      direction="column"
      width={20}
      backgroundColor="gray_100"
    >
      <Flex
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        {sideNavMenu.map(({ name, key, route }: SideMenu) => (
          <Link to={route} key={key}>
            <Button
              variant="default"
              paddingY={9}
              paddingX={16}
              fontSize="md"
              lineHeight="md"
              color="zinc_400"
              width="200px"
              marginTop={3}
              marginRight={3}
              marginLeft={3}
              marginBottom={3}
            >
              {name}
            </Button>
          </Link>
        ))}
      </Flex>
    </Section>
  );
};

export default LeftNav;
