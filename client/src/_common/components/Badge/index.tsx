import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Badge = React.forwardRef(function Badge(
  {
    /**
     * HTML태그 설정
     */
    as = "div",
    role = "",
    className,
    /**
     * Badge의 유형 설정
     */
    variant = "default",
    /**
     * 넓이/높이 설정
     */
    width = "auto",
    height = "auto",
    /**
     * 배치 설정
     */
    position = "static",
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
    /**
     * 기타 옵션 설정
     */
    cursor = "auto",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Badge
      /**
       * HTML태그 설정
       */
      as={as}
      role={role}
      className={className}
      /**
       * Badge의 유형 설정
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
      /**
       * 기타 옵션 설정
       */
      cursor={cursor}
      /**
       * ref 설정
       */
      ref={forwardRef}
      {...rest}
    >
      {children}
    </Styled.Badge>
  );
});
export default Badge;
