import React from "react";
import Button from "../button";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Form = React.forwardRef(function Form(
  {
    role = "",
    action = "",
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
    radius = 8,
    opacity = "inherit",
    cursor = "auto",
    onClick,
    onSubmit,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLFormElement>
) {
  return (
    <Styled.Form
      role={role}
      action={action}
      onSubmit={onSubmit}
      position={position}
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
      {/* <Button type="submit" variant={"zinc_200"} onClick={onClick}>
        확인
      </Button> */}
    </Styled.Form>
  );
});
export default Form;
