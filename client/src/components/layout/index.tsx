import Header from "components/header";
import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

export const Layout = React.forwardRef(function Layout(
  {
    as = "div",
    variant,
    children,
    className,
    backgroundColor = "inherit",
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <>
      <Styled.Layout
        as={as}
        variant={variant}
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
  const [state, setState] = React.useState(false);
  return (
    <div className={className} onClick={() => setState((v) => !v)}>
      <span> {String(state)}</span>
    </div>
  );
};
