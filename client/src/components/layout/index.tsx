import React from "react";
import { Link, Outlet } from "react-router-dom";

import * as Styled from "./index.styles";
import { Props } from "./index.types";

import Section from "components/section";
import Search from "components/search";
import Button from "_common/components/button";

type SideMenu = {
  name: string;
  key: string;
  route: string;
};

const subNavMenu: SideMenu[] = [
  // { name: "To-do", key: "todo", route: "/todo" },
  { name: "일정 관리", key: "schedule", route: "/my-schedule" },
  { name: "자기소개서", key: "my-documents", route: "/my-documents" },
];

export const Layout = React.forwardRef(function Layout(
  {
    as = "div",
    variant,
    searchBar,
    backgroundColor = "inherit",
    backgroundImage = "inherit",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  const subMenu = subNavMenu.map(({ name, key, route }: SideMenu) => (
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
  ));

  return (
    <>
      {searchBar && (
        <Section
          as="aside"
          width="100%"
          padding="1.5rem"
          className="sub_nav"
          backgroundColor="gray_100"
          backgroundImage={`linear-gradient(
      -90deg,
      rgb(118, 84, 219, .5) 0%,
      rgb(98, 136, 252, .8) 100%
    )
    
    `}
        >
          <Search />
        </Section>
      )}
      <Styled.Layout
        className={`layout__${variant}`}
        as={as}
        variant={variant}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        ref={forwardedRef}
        {...rest}
      >
        <Outlet />
      </Styled.Layout>
    </>
  );
});
