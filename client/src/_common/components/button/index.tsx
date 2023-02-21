import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Button = React.forwardRef(function Button(
  {
    /**
     * HTML태그 설정
     */
    type = "button",
    areaLabel = "",
    /**
     * Button의 유형 설정
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
    zIndex = "auto",
    top = "inherit",
    left = "inherit",
    bottom = "inherit",
    right = "inherit",
    /**
     * 배경/테두리 스타일 설정
     */
    backgroundColor = "inherit",
    radius = 8,
    /**
     * padding 설정
     */
    paddingX = 16,
    paddingY = 8,
    /**
     * font 스타일 설정
     */
    fontSize = "md",
    lineHeight = "md",
    fontWeight = 400,
    /**
     * margin 설정
     */
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,

    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLButtonElement>
) {
  return (
    <Styled.Button
      /**
       * HTML태그 설정
       */
      type={type}
      aria-label={areaLabel}
      /**
       * Button의 유형 설정
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
      top={top}
      bottom={bottom}
      right={right}
      left={left}
      zIndex={zIndex}
      /**
       * font 스타일 설정
       */
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      /**
       * margin 설정
       */
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      /**
       * padding 설정
       */
      paddingX={paddingX}
      paddingY={paddingY}
      /**
       * 배경/테두리 스타일 설정
       */
      backgroundColor={backgroundColor}
      radius={radius}
      /**
       * ref 설정
       */
      ref={forwardedRef}
      {...rest}
    >
      <Styled.InnerWrapper>{children}</Styled.InnerWrapper>
    </Styled.Button>
  );
});

export default Button;
