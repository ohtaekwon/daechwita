import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Input = React.forwardRef(function Input(
  {
    type,
    name,
    value,
    role = "",
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
    width = "inherit",
    height = "inherit",
    display = "flex",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    backgroundColor = "inherit",
    borderColor = "inherit",
    radius = 8,
    opacity = "inherit",
    cursor = "auto",
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <Styled.Input
      type={type}
      name={name}
      value={value}
      role={role}
      position={position}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      gridArea={gridArea}
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
    </Styled.Input>
  );
});
export default Input;
