import React from "react";
import * as Styled from "./index.styles";

import Flex from "_common/components/flex";

const Footer = () => {
  return (
    <Styled.Wrapper>
      {/* <Flex
        as="footer"
        alignContent="center"
        justifyContent="center"
        backgroundColor="white"
      > */}
      &copy; tk {new Date().getFullYear()} <br />
      {/* </Flex> */}
    </Styled.Wrapper>
  );
};
export default Footer;
