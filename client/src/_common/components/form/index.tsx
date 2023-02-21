import React from "react";
import Button from "../button";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Form = React.forwardRef(function Form(
  {
    role = "",
    action = "",
    /**
     * 넓이/높이 설정
     */
    width = "inherit",
    height = "inherit",
    /**
     * 배치 설정
     */
    position = "static",
    display = "flex",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    gridArea = "",
    /**
     * padding 설정
     */
    padding = "auto",
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    /**
     * margin 설정
     */
    margin = "auto",
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    /**
     * 배경/테두리 스타일 설정
     */
    backgroundColor = "inherit",
    radius = 8,
    opacity = "inherit",
    cursor = "auto",
    /**
     * 이벤트핸들러 설정
     */
    onClick,
    onSubmit,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLFormElement>
) {
  return (
    <Styled.Form
      /**
       * from태그 및 이벤트 설정
       */
      role={role}
      action={action}
      onSubmit={onSubmit}
      /**
       * 넓이/높이 설정
       */
      width={width}
      height={height}
      /**
       * 배치 설정
       */
      position={position}
      display={display}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gridArea={gridArea}
      /**
       * padding 설정
       */
      padding={padding}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      /**
       * margin 설정
       */
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      /**
       * 배경/테두리 스타일 설정
       */
      backgroundColor={backgroundColor}
      radius={radius}
      /**
       * 기타 옵션 설정
       */
      cursor={cursor}
      opacity={opacity}
      /**
       * ref 설정
       */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Form>
  );
});
export default Form;
