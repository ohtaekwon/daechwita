import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Textarea = React.forwardRef(function Textarea(
  {
    /** @description HTML태그 설정 */
    value = "",
    name = "",
    /** @description 넓이/높이 설정 */
    width = "inherit",
    height = "inherit",
    /** @description font 스타일 설정*/
    fontSize = "md",
    fontWeight = 400,
    color = "blackText_1",
    textAlign = "left",
    letterSpacing = "inherit",
    /** @description margin 설정 */
    margin = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    /** @description padding 설정*/
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    /** @description 배경/테두리 스타일 설정 */
    backgroundColor = "inherit",
    borderColor = "inherit",
    boxShadow = "inherit",
    radius = 8,

    /** @description 기타 옵션 설정 */
    opacity = 1,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLTextAreaElement>
) {
  return (
    <Styled.TextArea
      /** @description HTML태그 설정 */
      value={value}
      name={name}
      /** @description 넓이/높이 설정 */
      width={width}
      height={height}
      /** @description font 스타일 설정 */
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      letterSpacing={letterSpacing}
      /** @description margin 설정 */
      margin={margin}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      /** @description padding 설정 */
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      /** @description 배경/테두리 스타일 설정 */
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      boxShadow={boxShadow}
      radius={radius}
      /** @description 기타 옵션 설정 */
      opacity={opacity}
      /** @description ref 설정 */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.TextArea>
  );
});

export default Textarea;
