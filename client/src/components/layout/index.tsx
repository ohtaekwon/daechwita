/** @jsxImportSource @emotion/react */
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import * as Styled from "./index.styles";
import { Props } from "./index.types";

import Search from "components/Search";
import Header from "components/Header";

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
        <Suspense fallback={<h1>Loading..........</h1>}>
          <Outlet />
        </Suspense>
      </Styled.Layout>
    </>
  );
});
