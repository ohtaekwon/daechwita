import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Box = React.forwardRef(function Box(
  {
    as = "div",
    role = "",
    variant = "default",
    position = "static",
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    gridArea = "",
    children,
    gap = 0,
    width = "inherit",
    height = "inherit",
    display = "flex",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    backgroundColor = "inherit",
    radius = 8,
    opacity = "inherit",
    cursor = "auto",
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Box
      as={as}
      role={role}
      variant={variant}
      position={position}
      backgroundColor={backgroundColor}
      gridArea={gridArea}
      gap={gap}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      width={width}
      height={height}
      display={display}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      cursor={cursor}
      opacity={opacity}
      radius={radius}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Box>
  );
});
export default Box;
