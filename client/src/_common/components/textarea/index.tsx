import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Textarea = React.forwardRef(function Textarea(
  {
    value = "",
    children,
    fontSize = "md",
    color = "blackText_1",
    lineHeight = "md",
    fontWeight = 400,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    opacity = 1,
    textAlign = "left",
    letterSpacing = "inherit",
    width = "inherit",
    height = "inherit",
    margin = "inherit",
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLTextAreaElement>
) {
  return (
    <Styled.TextArea
      value={value}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      opacity={opacity}
      textAlign={textAlign}
      letterSpacing={letterSpacing}
      width={width}
      height={height}
      margin={margin}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.TextArea>
  );
});

export default Textarea;
