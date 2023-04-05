import React from "react";

import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Input = React.forwardRef(function Input(
  {
    /** @description HTML태그 설정 */
    type,
    name,
    value,
    role = "",
    accept,
    required = true,
    /** @description input의 유형 설정 */
    variant = "default",
    /** @description 넓이/높이 설정 */
    width = "inherit",
    height = "inherit",
    /** @description 배치 설정 */
    position = "static",
    display = "block",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    /** @description padding 설정 */
    padding = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    /** @description margin 설정 */
    margin = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    /** @description 배경/테두리 스타일 설정 */
    backgroundColor = "inherit",
    borderColor = "inherit",
    boxShadow = "inherit",
    placeholderColor = "inherit",
    radius = 8,
    /** @description 기타 옵션 설정 */
    opacity = "inherit",
    cursor = "auto",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <Styled.Input
      /** @description HTML태그 설정 */
      type={type}
      role={role}
      accept={accept}
      name={name}
      value={value}
      required={required}
      /** @description input의 유형 설정 */
      variant={variant}
      /** @description 넓이/높이 설정 */
      width={width}
      height={height}
      /** @description 배치 설정 */
      position={position}
      display={display}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      /** @description padding 설정 */
      padding={padding}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      /** @description margin 설정 */
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      /** @description 배경/테두리 스타일 설정 */
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      placeholderColor={placeholderColor}
      radius={radius}
      /** @description 기타 옵션 설정 */
      cursor={cursor}
      opacity={opacity}
      /** @description ref 설정 */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Input>
  );
});
export default Input;
