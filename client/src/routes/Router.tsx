import React from "react";
import { Link, Routes } from "react-router-dom";
import Header from "components/header";
import SignInRouter from "./signInRouter";
import DefaultRouter from "./defaultRouter";
import { Layout } from "components/layout";
import Flex from "_common/components/flex";
import Section from "components/section";
import DefaultLayout from "components/layout/defaultLayout";
import Button from "_common/components/button";

type Props = {
  isLoggedIn: Boolean | any;
};

type SideMenu = {
  [key: string]: any;
};

const sideNavMenu: SideMenu = [
  { name: "todo", key: "todo" },
  { name: "자소서", key: "abc" },
];

const Router = ({ isLoggedIn }: Props) => {
  return (
    <>
      {isLoggedIn && (
        <>
          <Header />
          <Layout as="main" variant="default">
            <Section
              as="figure"
              width={20}
              backgroundColor="neutral_300"
              sectionType="flex"
              direction="column"
            >
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
              <Button
                variant="default"
                paddingY={9}
                paddingX={16}
                fontSize="md"
                lineHeight="md"
                color="zinc_400"
              >
                ddd
              </Button>
            </Section>
          </Layout>
        </>
      )}
      {isLoggedIn ? <SignInRouter /> : <DefaultRouter />}
    </>
  );
};
export default Router;
