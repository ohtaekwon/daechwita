import React from "react";
import * as Styled from "./index.styles";

import Flex from "_common/components/flex";

const Footer = () => {
  return (
    <Styled.Wrapper>
      &copy; tk {new Date().getFullYear()} <br />
    </Styled.Wrapper>
  );
};
export default Footer;
