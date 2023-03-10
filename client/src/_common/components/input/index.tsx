import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Input = React.forwardRef(function Input(
  {
    /**
     * HTML태그 설정
     */
    type,
    name,
    value,
    role = "",
    accept,
    /**
     * input의 유형 설정
     */
    variant = "default",
    /**
     * 넓이/높이 설정
     */
    width = "inherit",
    height = "inherit",
    /**
     * 배치 설정
     */
    position = "static",
    display = "block",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    gridArea = "",
    /**
     * padding 설정
     */
    padding = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    /**
     * margin 설정
     */
    margin = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    /**
     * 배경/테두리 스타일 설정
     */
    backgroundColor = "inherit",
    borderColor = "inherit",
    boxShadow = "inherit",
    placeholderColor = "inherit",
    radius = 8,
    /**
     * 기타 옵션 설정
     */
    opacity = "inherit",
    cursor = "auto",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <Styled.Input
      /**
       * HTML태그 설정
       */
      type={type}
      role={role}
      accept={accept}
      name={name}
      value={value}
      /**
       * input의 유형 설정
       */
      variant={variant}
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
      gridArea={gridArea}
      justifyContent={justifyContent}
      alignItems={alignItems}
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
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      placeholderColor={placeholderColor}
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
    </Styled.Input>
  );
});
export default Input;
