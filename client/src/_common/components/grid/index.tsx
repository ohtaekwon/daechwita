import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Grid = React.forwardRef(function Grid(
  {
    as = "div",
    children,
    display = "grid",
    gridTemplateAreas = "none",
    gridTemplateColumns = "noe",
    gridTemplateRows = "auto",
    gap = 0,
    backgroundColor = "inherit",
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Grid
      as={as}
      display={display}
      gridTemplateAreas={gridTemplateAreas}
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateRows={gridTemplateRows}
      gap={gap}
      backgroundColor={backgroundColor}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Grid>
  );
});

export default Grid;
