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
    position = "static",
    zIndex = "auto",
    areaLabel = "",
    top = "inherit",
    left = "inherit",
    bottom = "inherit",
    right = "inherit",
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLButtonElement>
) {
  return (
    <Styled.Button
      variant={variant}
      areaLabel={areaLabel}
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
      position={position}
      zIndex={zIndex}
      top={top}
      bottom={bottom}
      right={right}
      left={left}
      ref={forwardedRef}
      {...rest}
    >
      <Styled.InnerWrapper>{children}</Styled.InnerWrapper>
    </Styled.Button>
  );
});

export default Button;
