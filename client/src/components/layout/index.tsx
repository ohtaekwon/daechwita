import Header from "components/header";
import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

export const Layout = React.forwardRef(function Layout(
  {
    as = "div",
    variant,
    width = 100,
    backgroundColor = "inherit",
    className,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <>
      <Styled.Layout
        as={as}
        variant={variant}
        width={width}
        backgroundColor={backgroundColor}
        ref={forwardedRef}
        className={className}
        {...rest}
      >
        {children}
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
