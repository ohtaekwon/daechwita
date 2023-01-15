import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

import Flex from "../../_common/components/flex";
import Header from "../header";

const Layout = ({
  variant,
  direction = "row",
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      <Header />
      <Styled.Main variant={variant} direction={direction}>
        <Flex>{children}</Flex>
      </Styled.Main>
    </>
  );
};
export default Layout;
