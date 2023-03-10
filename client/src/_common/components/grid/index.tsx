import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Grid = React.forwardRef(function Grid(
  {
    /**
     * 엘리먼트의 타입 설정
     */
    as = "div",
    /**
     * Grid 설정
     */
    display = "grid",
    gridTemplateAreas = "inherit",
    gridTemplateColumns = "inherit",
    gridTemplateRows = "auto",
    /**
     * 배치 설정
     */
    margin = 0,
    padding = 0,
    placeItems = "inherit",
    /**
     * 배경/테두리 스타일 설정
     */
    backgroundColor = "inherit",
    /**
     * 기타 옵션 설정
     */
    children,
    gap = 0,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Grid
      as={as}
      /**
       * Grid 설정 Prop
       */
      display={display}
      gridTemplateAreas={gridTemplateAreas}
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateRows={gridTemplateRows}
      /**
       * 배치 설정 Prop
       */
      margin={margin}
      padding={padding}
      placeItems={placeItems}
      /**
       * 배경/테두리 스타일 설정 Prop
       */
      backgroundColor={backgroundColor}
      /**
       * 기타 옵션 설정 Prop
       */
      gap={gap}
      /**
       * ref 설정
       */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Grid>
  );
});

export default Grid;
