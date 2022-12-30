import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Flex = React.forwardRef(function Flex(
  {
    as = "div",
    display = "flex",
    direction = "row",
    wrap = "nowrap",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    alignContent = "normal",
    backgroundColor = "inherit",
    gap = 0,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Flex
      as={as}
      display={display}
      direction={direction}
      wrap={wrap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      backgroundColor={backgroundColor}
      gap={gap}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Flex>
  );
});

export default Flex;
