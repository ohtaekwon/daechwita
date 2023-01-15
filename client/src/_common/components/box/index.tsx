import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Box = React.forwardRef(function Box(
  {
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    gridArea = "",
    children,
    width = "auto",
    display = "flex",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",

    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  return (
    <>
      <Styled.Box
        gridArea={gridArea}
        paddingTop={paddingTop}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        paddingBottom={paddingBottom}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        width={width}
        display={display}
        direction={direction}
        justifyContent={justifyContent}
        alignItems={alignItems}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </Styled.Box>
    </>
  );
});
export default Box;