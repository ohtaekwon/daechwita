import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Layout = React.forwardRef(function Layout(
  { as = "div", variant, children, ...rest }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Layout as={as} variant={variant} ref={forwardedRef} {...rest}>
      {children}
    </Styled.Layout>
  );
});

export default Layout;
