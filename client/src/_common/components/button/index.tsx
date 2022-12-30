import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Button = React.forwardRef(function Button(
  {
    variant = "default",
    backgroundColor = "inherit",
    fontSize = "md",
    lineHeight = "md",
    fontWeight = 400,
    radius = 8,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    paddingX = 16,
    paddingY = 8,
    width = "auto",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLButtonElement>
) {
  return (
    <Styled.Button
      variant={variant}
      backgroundColor={backgroundColor}
      radius={radius}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      paddingX={paddingX}
      paddingY={paddingY}
      width={width}
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      ref={forwardedRef}
      {...rest}
    >
      <Styled.InnerWrapper>{children}</Styled.InnerWrapper>
    </Styled.Button>
  );
});

export default Button;
