import React from "react";
import { Link, Outlet } from "react-router-dom";

import * as Styled from "./index.styles";
import { Props } from "./index.types";

import Section from "components/section";
import Search from "components/search";
import Button from "_common/components/button";
import Header from "components/header";

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
    variant = "default",
    header,
    inHeader,
    searchBar,
    backgroundColor = "inherit",
    background = "inherit",
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
      {header && <Header />}
      {searchBar && <Search />}
      <Styled.Layout
        className={`layout__${variant}`}
        as={as}
        variant={variant}
        backgroundColor={backgroundColor}
        background={background}
        ref={forwardedRef}
        {...rest}
      >
        {inHeader && <Header transparent />}
        <Outlet />
      </Styled.Layout>
    </>
  );
});
