import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Grid = React.forwardRef(function Grid(
  {
    as = "div",
    display = "grid",
    gridTemplateAreas = "",
    backgroundColor = "inherit",
    gap = 0,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  return (
    <Styled.Grid
      as={as}
      display={display}
      gridTemplateAreas={gridTemplateAreas}
      backgroundColor={backgroundColor}
      gap={gap}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Grid>
  );
});

export default Grid;
