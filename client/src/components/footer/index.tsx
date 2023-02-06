import React from "react";
import Flex from "_common/components/flex";

const Footer = () => {
  return (
    <Flex
      as="footer"
      alignContent="center"
      justifyContent="center"
      backgroundColor="white"
    >
      &copy; tk {new Date().getFullYear()}
    </Flex>
  );
};
export default Footer;
