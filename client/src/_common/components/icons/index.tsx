import React from "react";
import * as Styled from "./index.styles";
import { IconsItemType, Props } from "./index.types";

const Icons = React.forwardRef(function Icons(
  {
    backgroundColor = "inherit",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Icons
      backgroundColor={backgroundColor}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Icons>
  );
});

export default Icons;
