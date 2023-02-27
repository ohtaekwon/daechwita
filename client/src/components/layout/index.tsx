import Header from "components/header";
import Section from "components/section";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "_common/components/button";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

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

export const Layout = React.forwardRef(function Layout(
  {
    as = "div",
    variant,
    width = "auto",
    backgroundColor = "inherit",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  const leftMenu = sideNavMenu.map(({ name, key, route }: SideMenu) => (
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
      <Styled.Layout
        className={`layout__${variant}`}
        as={as}
        variant={variant}
        width={width}
        backgroundColor={backgroundColor}
        ref={forwardedRef}
        {...rest}
      >
        <Section
          as="aside"
          className="sub_nav"
          width="100%"
          display="flex"
          style={{ justifyContent: "center", alignItems: "center" }}
          backgroundColor="gray_100"
        >
          {leftMenu}
        </Section>
        <Outlet />
      </Styled.Layout>
    </>
  );
});

export const LayoutElement = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className: string;
}) => {
  return <div>{children}</div>;
};
