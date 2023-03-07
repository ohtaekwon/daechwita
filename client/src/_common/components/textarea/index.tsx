import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Textarea = React.forwardRef(function Textarea(
  {
    /**
     * HTML태그 설정
     */
    value = "",
    name = "",
    /**
     * 넓이/높이 설정
     */
    width = "inherit",
    height = "inherit",
    /**
     * font 스타일 설정
     */
    fontSize = "md",
    fontWeight = 400,
    color = "blackText_1",
    textAlign = "left",
    letterSpacing = "inherit",
    /**
     * margin 설정
     */
    margin = 0,
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
     * 배경/테두리 스타일 설정
     */
    backgroundColor = "inherit",
    borderColor = "inherit",
    boxShadow = "inherit",
    radius = 8,

    /**
     * 기타 옵션 설정정
     */
    opacity = 1,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLTextAreaElement>
) {
  return (
    <Styled.TextArea
      /**
       * HTML태그 설정
       */
      value={value}
      name={name}
      /**
       * 넓이/높이 설정
       */
      width={width}
      height={height}
      /**
       * font 스타일 설정
       */
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      letterSpacing={letterSpacing}
      /**
       * margin 설정
       */
      margin={margin}
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
       * 배경/테두리 스타일 설정
       */
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      boxShadow={boxShadow}
      radius={radius}
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
    </Styled.TextArea>
  );
});

export default Textarea;
