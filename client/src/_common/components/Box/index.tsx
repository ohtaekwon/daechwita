/** @jsxImportSource @emotion/react */
import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Box = React.forwardRef(function Box(
  {
    /** @description HTML태그 설정 */
    as = "div",
    role = "",
    /** @description Box의 유형 설정 */
    variant = "default",
    /** @description 넓이/높이 설정 */
    width = "inherit",
    height = "inherit",
    /** @description 배치 설정 */
    position = "static",
    display = "block",
    direction = "row",
    gridArea = "",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    top = "inherit",
    left = "inherit",
    bottom = "inherit",
    right = "inherit",
    zIndex = "auto",
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
    backgroundImage = "inherit",
    boxShadow = "inherit",
    radius = 8,
    /** @description 간격 설정 */
    gap = 0,
    /** @description 기타 옵션 설정 */
    opacity = "inherit",
    cursor = "auto",
    backfaceVisibility = "inherit",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Box
      /** @description HTML태그 설정 */
      as={as}
      role={role}
      /** @description Box의 유형 설정 */
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
      gridArea={gridArea}
      top={top}
      bottom={bottom}
      right={right}
      left={left}
      zIndex={zIndex}
      /** @description margin 설정 */
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      /** @description padding 설정 */
      padding={padding}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      /** @description 배경/테두리 스타일 설정 */
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      boxShadow={boxShadow}
      radius={radius}
      /** @description 간격 설정 */
      gap={gap}
      /** @description 기타 옵션 설정 */
      cursor={cursor}
      opacity={opacity}
      backfaceVisibility={backfaceVisibility}
      /** @description ref 설정 */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Box>
  );
});
export default Box;
