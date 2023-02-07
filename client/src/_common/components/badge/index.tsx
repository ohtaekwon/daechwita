import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Badge = React.forwardRef(function Badge(
  {
    as = "div",
    role = "",
    variant = "default",
    children,
    position = "static",
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    width = "auto",
    backgroundColor = "inherit",
    cursor = "auto",
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Badge
      as={as}
      role={role}
      variant={variant}
      position={position}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      width={width}
      backgroundColor={backgroundColor}
      cursor={cursor}
      ref={forwardRef}
      {...rest}
    >
      {children}
    </Styled.Badge>
  );
});
export default Badge;
