import React from "react";

import * as Styled from "./index.styles";
import { Props, TextProps } from "./index.types";

const Text = React.forwardRef(function Text(
  {
    as = "span",
    children,
    /**
     * font 스타일 설정
     */
    fontSize = "md", // 크기
    color = "blackText_1", // 색상
    lineHeight = "md", // 장평
    fontWeight = 400, // 굵기
    letterSpacing = "inherit", // 글 간격
    /**
     * 배치 설정
     */
    textAlign = "left", // 왼쪽 정렬
    /**
     * margin 설정
     */
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    /**
     * padding 설정
     */
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    /**
     * 기타 옵션 설정정
     */
    opacity = 1,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Text
      as={as}
      /**
       * font 스타일 설정
       */
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      /**
       * 배치 설정
       */
      textAlign={textAlign}
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
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      /**
       * 기타 옵션 설정정
       */
      opacity={opacity}
      /**
       * ref 설정
       */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Text>
  );
});

export default Text;
