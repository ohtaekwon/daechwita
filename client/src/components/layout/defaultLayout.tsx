import React from "react";
import Section from "components/section";
import Flex from "_common/components/flex";
import { Layout } from ".";
import Button from "_common/components/button";
import { Link } from "react-router-dom";
import Header from "components/header";

const DefaultLayout = ({
  sideNavMenu,
  children,
}: {
  sideNavMenu: any;
  children?: React.ReactNode;
}) => {
  console.log(sideNavMenu);

  return (
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
        {children}
      </Layout>
    </>
  );
};
export default DefaultLayout;
